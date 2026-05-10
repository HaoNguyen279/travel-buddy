"use client";

import { useEffect, useState } from "react";
import { onDisconnect, onValue, ref, serverTimestamp, set } from "firebase/database";
import { rtdb } from "@/lib/firebase";

export type CurrentUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
};

export type UserPresence = {
  state: "online" | "offline";
  lastChanged: number | null;
  displayName: string;
  photoURL: string;
};

const DEFAULT_PRESENCE: UserPresence = {
  state: "offline",
  lastChanged: null,
  displayName: "",
  photoURL: "",
};

function buildProfilePayload(currentUser: CurrentUser) {
  return {
    uid: currentUser.uid,
    displayName: currentUser.displayName || currentUser.email || "Anonymous",
    photoURL: currentUser.photoURL || "",
  };
}

export async function setUserPresenceState(
  currentUser: CurrentUser,
  state: "online" | "offline",
) {
  const statusRef = ref(rtdb, `status/${currentUser.uid}`);
  const profilePayload = buildProfilePayload(currentUser);

  await set(statusRef, {
    ...profilePayload,
    state,
    lastChanged: serverTimestamp(),
  });
}

export function usePresence(currentUser: CurrentUser | null | undefined) {
  useEffect(() => {
    if (!currentUser?.uid) return;

    const presenceUser: CurrentUser = {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
    };
    const statusRef = ref(rtdb, `status/${presenceUser.uid}`);
    const connectedRef = ref(rtdb, ".info/connected");
    const profilePayload = buildProfilePayload(presenceUser);

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      const isConnected = snapshot.val() === true;
      if (!isConnected) return;

      onDisconnect(statusRef)
        .set({
          ...profilePayload,
          state: "offline",
          lastChanged: serverTimestamp(),
        })
        .then(() => {
          return setUserPresenceState(presenceUser, "online");
        })
        .catch((error) => {
          console.error("Failed to set presence state", error);
        });
    });

    return () => {
      unsubscribe();
      void setUserPresenceState(presenceUser, "offline").catch((error) => {
        console.error("Failed to clear presence state", error);
      });
    };
  }, [currentUser?.uid, currentUser?.displayName, currentUser?.email, currentUser?.photoURL]);
}

export function useUserPresence(targetUid?: string | null) {
  const [presence, setPresence] = useState<UserPresence | null>(null);

  useEffect(() => {
    if (!targetUid) return;

    const statusRef = ref(rtdb, `status/${targetUid}`);
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setPresence(DEFAULT_PRESENCE);
        return;
      }

      setPresence({
        state: data.state === "online" ? "online" : "offline",
        lastChanged: typeof data.lastChanged === "number" ? data.lastChanged : null,
        displayName: typeof data.displayName === "string" ? data.displayName : "",
        photoURL: typeof data.photoURL === "string" ? data.photoURL : "",
      });
    });

    return () => unsubscribe();
  }, [targetUid]);

  if (!targetUid) return DEFAULT_PRESENCE;
  return presence || DEFAULT_PRESENCE;
}

export function formatLastSeen(lastChanged: number | null) {
  if (!lastChanged) return "offline";
  return `last seen ${new Date(lastChanged).toLocaleString("vi-VN")}`;
}

