"use client";
import { Navbar } from "@/components/nav/Navbar";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { Circle, Clock3, Users } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "../context/AuthContext";
import {
  formatLastSeen,
  usePresence,
  useUserPresence,
} from "@/features/chat/hooks/usePresence";
import { useRoomTyping } from "@/features/chat/hooks/useRoomTyping";
import {
  getMyProfile,
  getFollowing,
  resolveUserIdByEmail,
} from "@/services/userProfileService";

type ChatType = "direct" | "group";
const TYPING_IDLE_DELAY_MS = 5000;

type UserProfile = {
  uid: string;
  displayName: string;
  avatarUrl?: string;
  email?: string | null;
};

type ChatRoom = {
  id: string;
  type: ChatType;
  name?: string;
  avatarUrl?: string;
  participants: string[];
  participantProfiles?: Record<string, UserProfile>;
  lastMessage?: string;
  lastMessageAt?: Timestamp | null;
};

type ChatMessage = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  createdAt?: Timestamp | null;
};

const FALLBACK_AVATAR = "👤";
const URL_PATTERN = /^https?:\/\//i;
const navProps = {
  webName: "TravelBuddy",
  subtitle: "",
  itemOnNav: [
    {
      itemName: "Bài viết",
      linkTo: "/post",
    },
    {
      itemName: "Địa điểm",
      linkTo: "/place/da-nang",
    },
    {
      itemName: "Chat",
      linkTo: "/chat",
    },
  ],
};

function sortByLatestRooms(a: ChatRoom, b: ChatRoom) {
  const aTs = a.lastMessageAt?.toMillis() ?? 0;
  const bTs = b.lastMessageAt?.toMillis() ?? 0;
  return bTs - aTs;
}

function formatChatTime(value?: Timestamp | null) {
  if (!value) return "";
  return new Date(value.toMillis()).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAvatarLabel(profile?: UserProfile) {
  if (profile?.avatarUrl) return profile.avatarUrl;
  if (profile?.displayName) return profile.displayName.charAt(0).toUpperCase();
  return FALLBACK_AVATAR;
}

function getDisplayNameByUid(
  uid: string | undefined,
  profiles: Record<string, UserProfile> | undefined,
  allUsersMap: Map<string, UserProfile>,
) {
  if (!uid) return "Direct Chat";
  return (
    allUsersMap.get(uid)?.displayName ||
    profiles?.[uid]?.displayName ||
    "Direct Chat"
  );
}

function getAvatarByUid(
  uid: string | undefined,
  profiles: Record<string, UserProfile> | undefined,
  allUsersMap: Map<string, UserProfile>,
) {
  if (!uid) return FALLBACK_AVATAR;
  return (
    allUsersMap.get(uid)?.avatarUrl ||
    allUsersMap.get(uid)?.displayName?.charAt(0).toUpperCase() ||
    profiles?.[uid]?.avatarUrl ||
    profiles?.[uid]?.displayName?.charAt(0).toUpperCase() ||
    FALLBACK_AVATAR
  );
}

function AvatarCircle({
  value,
  className,
}: {
  value?: string;
  className?: string;
}) {
  const avatarValue = (value || FALLBACK_AVATAR).trim();
  const isImageUrl = URL_PATTERN.test(avatarValue);
  const textAvatar =
    avatarValue.length === 1
      ? avatarValue
      : avatarValue.charAt(0).toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-slate-200 overflow-hidden ${className || ""}`}
    >
      {isImageUrl ? (
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${avatarValue})` }}
        />
      ) : (
        <span>{textAvatar}</span>
      )}
    </div>
  );
}

export default function ChatPage() {
  const { user, loading } = useAuth();
  usePresence(user);

  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [allowedUserEmails, setAllowedUserEmails] = useState<Set<string>>(
    () => new Set(),
  );

  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [draftMessage, setDraftMessage] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState<ChatType>("direct");
  const [groupName, setGroupName] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [createError, setCreateError] = useState("");
  const [typingError, setTypingError] = useState("");
  const [chatAccessError, setChatAccessError] = useState("");
  const [peerEmailFromQuery, setPeerEmailFromQuery] = useState("");
  const [myBackendProfile, setMyBackendProfile] = useState<{
    displayName: string;
    avatarUrl: string;
    email: string;
  } | null>(null);
  const [followingProfileByEmail, setFollowingProfileByEmail] = useState<
    Record<string, { displayName: string; avatarUrl: string }>
  >({});

  const messagesBottomRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handledPeerEmailRef = useRef<string | null>(null);
  const usersMap = useMemo(
    () => new Map(users.map((item) => [item.uid, item])),
    [users],
  );

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    void setDoc(
      userRef,
      {
        uid: user.uid,
        displayName:
          myBackendProfile?.displayName ||
          user.displayName ||
          user.email ||
          "Anonymous",
        avatarUrl: myBackendProfile?.avatarUrl || user.photoURL || "",
        email: myBackendProfile?.email || user.email || "",
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }, [user, myBackendProfile]);

  useEffect(() => {
    if (!user?.email) {
      setAllowedUserEmails(new Set());
      return;
    }

    let isMounted = true;
    const loadFollowingUsers = async () => {
      try {
        const currentUserId = await resolveUserIdByEmail(user.email || "");
        if (!currentUserId) {
          if (isMounted) setAllowedUserEmails(new Set());
          return;
        }

        const myProfileData = await getMyProfile();
        if (isMounted && myProfileData) {
          setMyBackendProfile({
            displayName:
              myProfileData.full_name?.trim() ||
              myProfileData.username ||
              user.displayName ||
              user.email ||
              "Anonymous",
            avatarUrl: myProfileData.avatar_url || "",
            email: myProfileData.email || user.email || "",
          });
        }

        const following = await getFollowing(currentUserId);
        const followingProfiles: Record<
          string,
          { displayName: string; avatarUrl: string }
        > = {};
        (following.items || []).forEach((item) => {
          const key = String(item.email || "").toLowerCase();
          if (!key) return;
          followingProfiles[key] = {
            displayName:
              item.full_name?.trim() || item.username || String(item.email || ""),
            avatarUrl: item.avatar_url || "",
          };
        });
        const allowedEmails = new Set(
          (following.items || [])
            .map((item) => String(item.email || "").toLowerCase())
            .filter(Boolean),
        );
        if (isMounted) {
          setAllowedUserEmails(allowedEmails);
          setFollowingProfileByEmail(followingProfiles);
        }
      } catch {
        if (isMounted) {
          setAllowedUserEmails(new Set());
          setFollowingProfileByEmail({});
        }
      }
    };

    void loadFollowingUsers();
    return () => {
      isMounted = false;
    };
  }, [user?.email, user?.displayName]);

  useEffect(() => {
    if (!user) return;

    const usersQuery = query(
      collection(db, "users"),
      orderBy("displayName", "asc"),
    );
    const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const userList = snapshot.docs
        .map((docItem) => {
          const data = docItem.data();
          const email = typeof data.email === "string" ? data.email : "";
          const override = followingProfileByEmail[email.toLowerCase()];
          return {
            uid: docItem.id,
            displayName: override?.displayName ||
              (typeof data.displayName === "string"
                ? data.displayName
                : "Anonymous"),
            avatarUrl: override?.avatarUrl ||
              (typeof data.avatarUrl === "string" ? data.avatarUrl : ""),
            email,
          } satisfies UserProfile;
        })
        .filter((item) => item.uid !== user.uid);

      setUsers(userList);
    });

    return () => unsubscribe();
  }, [user, followingProfileByEmail]);

  useEffect(() => {
    if (!user) return;

    const roomsQuery = query(
      collection(db, "rooms"),
      where("participants", "array-contains", user.uid),
    );

    const unsubscribe = onSnapshot(roomsQuery, (snapshot) => {
      const roomItems = snapshot.docs
        .map((docItem) => {
          const data = docItem.data();
          return {
            id: docItem.id,
            type: data.type === "group" ? "group" : "direct",
            name: typeof data.name === "string" ? data.name : "",
            avatarUrl: typeof data.avatarUrl === "string" ? data.avatarUrl : "",
            participants: Array.isArray(data.participants)
              ? (data.participants as string[])
              : [],
            participantProfiles:
              typeof data.participantProfiles === "object" &&
              data.participantProfiles
                ? (data.participantProfiles as Record<string, UserProfile>)
                : {},
            lastMessage:
              typeof data.lastMessage === "string" ? data.lastMessage : "",
            lastMessageAt:
              data.lastMessageAt instanceof Timestamp
                ? data.lastMessageAt
                : null,
          } satisfies ChatRoom;
        })
        .sort(sortByLatestRooms);

      setRooms(roomItems);

      if (!activeRoomId && roomItems.length > 0) {
        setActiveRoomId(roomItems[0].id);
      }
      if (
        activeRoomId &&
        roomItems.length > 0 &&
        !roomItems.some((room) => room.id === activeRoomId)
      ) {
        setActiveRoomId(roomItems[0].id);
      }
    });

    return () => unsubscribe();
  }, [user, activeRoomId]);

  useEffect(() => {
    if (!activeRoomId) {
      return;
    }

    const messagesQuery = query(
      collection(db, "rooms", activeRoomId, "messages"),
      orderBy("createdAt", "asc"),
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messageItems = snapshot.docs.map((docItem) => {
        const data = docItem.data();
        return {
          id: docItem.id,
          text: typeof data.text === "string" ? data.text : "",
          senderId: typeof data.senderId === "string" ? data.senderId : "",
          senderName:
            typeof data.senderName === "string" ? data.senderName : "Anonymous",
          senderAvatar:
            typeof data.senderAvatar === "string" ? data.senderAvatar : "",
          createdAt:
            data.createdAt instanceof Timestamp ? data.createdAt : null,
        } satisfies ChatMessage;
      });
      setMessages(messageItems);
    });

    return () => unsubscribe();
  }, [activeRoomId]);

  useEffect(() => {
    messagesBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const activeRoom = useMemo(
    () => rooms.find((room) => room.id === activeRoomId) ?? null,
    [rooms, activeRoomId],
  );

  const activeRoomIdentity = useMemo(() => {
    if (!activeRoom || !user) {
      return { name: "Select a chat", avatar: FALLBACK_AVATAR, peerUid: null };
    }

    if (activeRoom.type === "group") {
      return {
        name: activeRoom.name?.trim() || "Group Chat",
        avatar: activeRoom.avatarUrl || "👥",
        peerUid: null,
      };
    }

    const targetId = activeRoom.participants.find((id) => id !== user.uid);

    return {
      name: getDisplayNameByUid(
        targetId,
        activeRoom.participantProfiles,
        usersMap,
      ),
      avatar: getAvatarByUid(
        targetId,
        activeRoom.participantProfiles,
        usersMap,
      ),
      peerUid: targetId || null,
    };
  }, [activeRoom, user, usersMap]);

  const peerPresence = useUserPresence(activeRoomIdentity.peerUid);

  const visibleRooms = useMemo(
    () => [...rooms].sort(sortByLatestRooms),
    [rooms],
  );

  const eligibleUsers = useMemo(
    () =>
      users.filter((item) =>
        allowedUserEmails.has(String(item.email || "").toLowerCase()),
      ),
    [users, allowedUserEmails],
  );

  const filteredUsers = useMemo(() => {
    const term = userSearch.trim().toLowerCase();
    if (!term) return eligibleUsers;
    return eligibleUsers.filter((item) => {
      const byName = item.displayName.toLowerCase().includes(term);
      const byEmail = (item.email || "").toLowerCase().includes(term);
      return byName || byEmail;
    });
  }, [eligibleUsers, userSearch]);

  const myProfile = useMemo(() => {
    if (!user) return null;
    return {
      uid: user.uid,
      displayName:
        myBackendProfile?.displayName ||
        user.displayName ||
        user.email ||
        "Anonymous",
      avatarUrl: myBackendProfile?.avatarUrl || user.photoURL || "",
      email: myBackendProfile?.email || user.email || "",
    } satisfies UserProfile;
  }, [user, myBackendProfile]);

  const typingActor = useMemo(() => {
    if (!user) return null;

    return {
      uid: user.uid,
      displayName:
        myProfile?.displayName || user.displayName || user.email || "Anonymous",
      photoURL: myProfile?.avatarUrl || user.photoURL || "",
    };
  }, [user, myProfile?.displayName, myProfile?.avatarUrl]);

  const { typingUsers, setTyping } = useRoomTyping(activeRoomId, typingActor);

  const canChatInActiveRoom = useMemo(() => {
    if (!activeRoom || !user) return false;
    if (activeRoom.type === "group") return true;

    const peerId = activeRoom.participants.find((id) => id !== user.uid);
    if (!peerId) return false;
    const peerEmail =
      activeRoom.participantProfiles?.[peerId]?.email ||
      usersMap.get(peerId)?.email ||
      "";
    return allowedUserEmails.has(String(peerEmail).toLowerCase());
  }, [activeRoom, user, usersMap, allowedUserEmails]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!activeRoomId) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    void setTyping(false).catch((error) => {
      setTypingError("Typing write failed. Check RTDB rules/connection.");
      console.error("Failed to reset typing state on room change", error);
    });
  }, [activeRoomId, setTyping]);

  useEffect(() => {
    setChatAccessError("");
  }, [activeRoomId]);

  const handleDraftChange = (value: string) => {
    setDraftMessage(value);
    if (!activeRoomId) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    if (!value.trim()) {
      void setTyping(false).catch((error) => {
        setTypingError("Typing write failed. Check RTDB rules/connection.");
        console.error("Failed to update typing state", error);
      });
      return;
    }

    setTypingError("");
    void setTyping(true).catch((error) => {
      setTypingError("Typing write failed. Check RTDB rules/connection.");
      console.error("Failed to update typing state", error);
    });

    typingTimeoutRef.current = setTimeout(() => {
      void setTyping(false).catch((error) => {
        setTypingError("Typing write failed. Check RTDB rules/connection.");
        console.error("Failed to update typing state", error);
      });
    }, TYPING_IDLE_DELAY_MS);
  };

  const openCreateModal = () => {
    setCreateError("");
    setCreateType("direct");
    setGroupName("");
    setUserSearch("");
    setSelectedUserIds([]);
    setIsCreateModalOpen(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const peerEmail = String(params.get("peerEmail") || "").toLowerCase();
    setPeerEmailFromQuery(peerEmail);
  }, []);

  const ensureDirectRoom = async (peerProfile: UserProfile) => {
    if (!user || !myProfile) return null;

    const peerEmail = String(peerProfile.email || "").toLowerCase();
    if (!allowedUserEmails.has(peerEmail)) {
      setChatAccessError("Bạn chỉ có thể nhắn với người đang theo dõi.");
      return null;
    }

    const participantIds = [user.uid, peerProfile.uid].sort();
    const roomId = `direct_${participantIds.join("_")}`;
    const roomRef = doc(db, "rooms", roomId);
    const existingRoom = await getDoc(roomRef);
    const participantProfiles: Record<string, UserProfile> = {
      [user.uid]: myProfile,
      [peerProfile.uid]: peerProfile,
    };

    if (!existingRoom.exists()) {
      await setDoc(roomRef, {
        type: "direct",
        participants: participantIds,
        participantProfiles,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessage: "",
        lastMessageAt: null,
      });
    } else {
      await setDoc(
        roomRef,
        {
          participants: participantIds,
          participantProfiles,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }

    return roomId;
  };

  useEffect(() => {
    const peerEmail = peerEmailFromQuery;
    if (!peerEmail || !user || !myProfile || users.length === 0) return;
    if (handledPeerEmailRef.current === peerEmail) return;

    const peerProfile = users.find(
      (item) => String(item.email || "").toLowerCase() === peerEmail,
    );
    if (!peerProfile) return;

    handledPeerEmailRef.current = peerEmail;
    void ensureDirectRoom(peerProfile).then((roomId) => {
      if (roomId) {
        setActiveRoomId(roomId);
      }
    });
  }, [peerEmailFromQuery, user, myProfile, users, allowedUserEmails]);

  const toggleUserSelection = (targetId: string) => {
    setSelectedUserIds((prev) => {
      if (createType === "direct") return [targetId];
      if (prev.includes(targetId)) return prev.filter((id) => id !== targetId);
      return [...prev, targetId];
    });
  };

  const createChat = async () => {
    if (!user || !myProfile) return;

    setCreateError("");

    if (selectedUserIds.length === 0) {
      setCreateError("Vui lòng chọn ít nhất một người để bắt đầu chat.");
      return;
    }

    if (createType === "direct") {
      const peerId = selectedUserIds[0];
      if (!peerId) {
        setCreateError("Không thể tạo cuộc trò chuyện trực tiếp.");
        return;
      }

      const peerProfile = users.find((item) => item.uid === peerId);
      if (!peerProfile) {
        setCreateError("Không tìm thấy người dùng để tạo chat.");
        return;
      }

      const roomId = await ensureDirectRoom(peerProfile);
      if (!roomId) {
        setCreateError("Bạn chỉ có thể chat với người đang theo dõi.");
        return;
      }

      setActiveRoomId(roomId);
      setIsCreateModalOpen(false);
      return;
    }

    const normalizedGroupName = groupName.trim();
    if (!normalizedGroupName) {
      setCreateError("Vui lòng nhập tên nhóm.");
      return;
    }

    const participantIds = Array.from(new Set([user.uid, ...selectedUserIds]));
    const participantProfiles: Record<string, UserProfile> = {
      [user.uid]: myProfile,
    };
    selectedUserIds.forEach((id) => {
      const profile = users.find((item) => item.uid === id);
      if (profile) participantProfiles[id] = profile;
    });

    const roomRef = doc(collection(db, "rooms"));
    await setDoc(roomRef, {
      type: "group",
      name: normalizedGroupName,
      participants: participantIds,
      participantProfiles,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastMessage: "",
      lastMessageAt: null,
    });

    setActiveRoomId(roomRef.id);
    setIsCreateModalOpen(false);
  };

  const sendMessage = async () => {
    if (!activeRoomId || !user || !myProfile) return;
    if (!canChatInActiveRoom) {
      setChatAccessError("Bạn chỉ có thể nhắn với người đang theo dõi.");
      return;
    }

    const content = draftMessage.trim();
    if (!content) return;

    await addDoc(collection(db, "rooms", activeRoomId, "messages"), {
      text: content,
      senderId: user.uid,
      senderName: myProfile.displayName,
      senderAvatar: myProfile.avatarUrl,
      createdAt: serverTimestamp(),
      status: "sent",
    });

    await setDoc(
      doc(db, "rooms", activeRoomId),
      {
        lastMessage: content,
        lastMessageAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    setDraftMessage("");
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    await setTyping(false);
  };

  if (loading) {
    return <main className="px-4 py-10">Loading chat...</main>;
  }

  if (!user) {
    return (
      <main className="px-4 py-10">Bạn cần đăng nhập để sử dụng chat.</main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-amber-50">
      <Navbar
        webName={navProps.webName}
        subtitle={navProps.subtitle}
        itemOnNav={navProps.itemOnNav}
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="flex h-[75vh] min-h-[620px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <aside className="flex w-[360px] flex-col border-r border-slate-200 bg-slate-50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-4xl font-semibold text-slate-900">Chats</h1>
            <button
              type="button"
              onClick={openCreateModal}
              className="rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              + Create New Chat
            </button>
          </div>

          <div className="mb-4 text-2xl font-semibold text-blue-600">
            Recent Chats
          </div>

          <div className="space-y-4 overflow-y-auto pr-1">
            {visibleRooms.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-500">
                Chưa có cuộc trò chuyện nào.
              </div>
            ) : (
              visibleRooms.map((room) => {
                const isActive = room.id === activeRoomId;
                const directPeerId = room.participants.find(
                  (id) => id !== user.uid,
                );
                const roomName =
                  room.type === "group"
                    ? room.name || "Group Chat"
                    : getDisplayNameByUid(
                        directPeerId,
                        room.participantProfiles,
                        usersMap,
                      );
                const roomAvatar =
                  room.type === "group"
                    ? room.avatarUrl || "👥"
                    : getAvatarByUid(
                        directPeerId,
                        room.participantProfiles,
                        usersMap,
                      );

                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setActiveRoomId(room.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      isActive
                        ? "border-blue-300 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <AvatarCircle
                        value={roomAvatar}
                        className="h-12 w-12 text-lg font-semibold"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-lg font-semibold text-slate-900">
                          {roomName}
                        </p>
                        <p className="truncate text-sm text-slate-500">
                          {room.lastMessage || "Chưa có tin nhắn"}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-slate-400">
                        {formatChatTime(room.lastMessageAt)}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <AvatarCircle
                value={activeRoomIdentity.avatar}
                className="h-11 w-11 text-lg"
              />
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {activeRoomIdentity.name}
                </p>
                {activeRoomIdentity.peerUid && (
                  <p
                    className={`text-xs ${
                      peerPresence.state === "online"
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  >
                    {peerPresence.state === "online"
                      ? "online"
                      : formatLastSeen(peerPresence.lastChanged)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Clock3 size={22} />
              <Circle size={22} />
            </div>
          </header>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            {messages.length === 0 ? (
              <p className="text-center text-slate-400">
                Chưa có tin nhắn trong cuộc trò chuyện này.
              </p>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === user.uid;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-3 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!isMe && (
                      <AvatarCircle
                        value={
                          usersMap.get(msg.senderId)?.avatarUrl ||
                          msg.senderAvatar ||
                          usersMap.get(msg.senderId)?.displayName ||
                          msg.senderName
                        }
                        className="h-9 w-9 text-xs font-semibold"
                      />
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 text-base ${
                        isMe
                          ? "bg-blue-500 text-white"
                          : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      {!isMe && (
                        <p className="mb-1 text-xs text-slate-500">
                          {usersMap.get(msg.senderId)?.displayName || msg.senderName}
                        </p>
                      )}
                      <p>{msg.text}</p>
                    </div>
                    {isMe && (
                      <AvatarCircle
                        value={
                          myProfile?.avatarUrl ||
                          myProfile?.displayName ||
                          user.photoURL ||
                          user.displayName ||
                          user.email ||
                          "Me"
                        }
                        className="h-9 w-9 bg-slate-900 text-xs font-semibold text-white"
                      />
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesBottomRef} />
          </div>

          <div className="border-t border-slate-200 p-4">
            {typingUsers.length > 0 && (
              <p className="mb-2 text-sm text-slate-500">
                {typingUsers.map((item) => item.displayName).join(", ")} đang
                nhập...
              </p>
            )}
            <form
              className="flex items-center gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage();
              }}
            >
              <input
                type="text"
                value={draftMessage}
                onChange={(event) => handleDraftChange(event.target.value)}
                placeholder="Nhập tin nhắn..."
                className="h-12 flex-1 rounded-xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-blue-500"
                disabled={!activeRoomId || !canChatInActiveRoom}
              />
              <button
                type="submit"
                className="h-12 rounded-xl bg-blue-500 px-6 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={!activeRoomId || !draftMessage.trim() || !canChatInActiveRoom}
              >
                Gửi
              </button>
            </form>
            {!canChatInActiveRoom && activeRoomId && (
              <p className="mt-2 text-xs text-rose-500">
                Bạn chỉ có thể nhắn tin với người đang theo dõi.
              </p>
            )}
            {chatAccessError && (
              <p className="mt-2 text-xs text-rose-500">{chatAccessError}</p>
            )}
            {typingError && (
              <p className="mt-2 text-xs text-rose-500">{typingError}</p>
            )}
          </div>
        </div>
      </section>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                Create New Chat
              </h2>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
              >
                Đóng
              </button>
            </div>

            <div className="mb-4 flex items-center gap-5">
              <label className="flex items-center gap-2 text-slate-700">
                <input
                  type="radio"
                  name="chat-type"
                  checked={createType === "direct"}
                  onChange={() => {
                    setCreateType("direct");
                    setSelectedUserIds([]);
                  }}
                />
                Direct
              </label>
              <label className="flex items-center gap-2 text-slate-700">
                <input
                  type="radio"
                  name="chat-type"
                  checked={createType === "group"}
                  onChange={() => setCreateType("group")}
                />
                Group
              </label>
            </div>

            {createType === "group" && (
              <input
                type="text"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder="Tên nhóm"
                className="mb-3 h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500"
              />
            )}

            <input
              type="text"
              value={userSearch}
              onChange={(event) => setUserSearch(event.target.value)}
              placeholder="Tìm người dùng theo tên hoặc email"
              className="mb-3 h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500"
            />

            <div className="max-h-72 space-y-2 overflow-y-auto rounded-xl border border-slate-200 p-3">
              {filteredUsers.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Bạn chưa theo dõi ai để bắt đầu chat.
                </p>
              ) : (
                filteredUsers.map((item) => {
                  const selected = selectedUserIds.includes(item.uid);
                  return (
                    <button
                      key={item.uid}
                      type="button"
                      onClick={() => toggleUserSelection(item.uid)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition ${
                        selected
                          ? "border-blue-300 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <AvatarCircle
                          value={getAvatarLabel(item)}
                          className="h-9 w-9 text-sm"
                        />
                        <div>
                          <p className="font-medium text-slate-900">
                            {item.displayName}
                          </p>
                          <p className="text-xs text-slate-500">{item.email}</p>
                        </div>
                      </div>
                      {createType === "group" ? (
                        <Users
                          size={18}
                          className={
                            selected ? "text-blue-500" : "text-slate-400"
                          }
                        />
                      ) : (
                        <Circle
                          size={18}
                          className={
                            selected
                              ? "fill-blue-500 text-blue-500"
                              : "text-slate-400"
                          }
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {createError && (
              <p className="mt-3 text-sm text-red-600">{createError}</p>
            )}

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => void createChat()}
                className="rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
              >
                Tạo chat
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
