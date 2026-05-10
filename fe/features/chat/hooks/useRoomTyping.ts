"use client";

import { useCallback, useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { rtdb } from "@/lib/firebase";

type TypingActor = {
  uid: string;
  displayName: string;
  photoURL?: string;
};

export type TypingUser = {
  uid: string;
  displayName: string;
  photoURL: string;
  updatedAt: number;
};

const TYPING_EXPIRE_MS = 15000;

export function useRoomTyping(
  roomId: string | null,
  currentUser: TypingActor | null,
) {
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const actorUid = currentUser?.uid || null;
  const actorDisplayName = currentUser?.displayName || "Anonymous";
  const actorPhotoURL = currentUser?.photoURL || "";

  const setTyping = useCallback(
    async (isTyping: boolean) => {
      if (!roomId || !actorUid) return;

      const typingRef = ref(rtdb, `typing/${roomId}/${actorUid}`);
      await set(typingRef, {
        uid: actorUid,
        displayName: actorDisplayName,
        photoURL: actorPhotoURL,
        isTyping,
        updatedAt: Date.now(),
      });
    },
    [roomId, actorUid, actorDisplayName, actorPhotoURL],
  );

  useEffect(() => {
    if (!roomId || !actorUid) return;

    const typingRef = ref(rtdb, `typing/${roomId}`);
    const unsubscribe = onValue(typingRef, (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setTypingUsers([]);
        return;
      }

      const users = Object.values(data)
        .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
        .map((item) => {
          return {
            uid: typeof item.uid === "string" ? item.uid : "",
            displayName:
              typeof item.displayName === "string" ? item.displayName : "Anonymous",
            photoURL: typeof item.photoURL === "string" ? item.photoURL : "",
            updatedAt: typeof item.updatedAt === "number" ? item.updatedAt : 0,
            isTyping: item.isTyping === true,
          };
        })
        .filter((item) => {
          const notMe = item.uid !== actorUid;
          return item.isTyping && notMe;
        })
        .map((item) => ({
          uid: item.uid,
          displayName: item.displayName,
          photoURL: item.photoURL,
          updatedAt: item.updatedAt,
        }));

      setTypingUsers(users);
    }, (error) => {
      console.error("Failed to read typing state", error);
      setTypingUsers([]);
    });

    return () => {
      unsubscribe();
      void setTyping(false).catch((error) => {
        console.error("Failed to clear typing state", error);
      });
    };
  }, [roomId, actorUid, setTyping]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingUsers((prev) =>
        prev.filter((item) => Date.now() - item.updatedAt < TYPING_EXPIRE_MS),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { typingUsers: roomId ? typingUsers : [], setTyping };
}

