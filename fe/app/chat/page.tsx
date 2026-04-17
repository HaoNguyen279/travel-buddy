"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "../context/AuthContext";

interface Message {
  id: string;
  text: string;
  sender: string;
  createdAt: Timestamp | null;
}

const AdvancedChatTest: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentUser, setCurrentUser] = useState(user?.displayName);
  const [chatType, setChatType] = useState<"direct" | "group">("direct");

  // Trạng thái cho 1-1
  const [targetUser, setTargetUser] = useState("User2");
  // Trạng thái cho Group
  const [groupName, setGroupName] = useState("General");

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // 2. Tạo Room ID duy nhất dựa trên loại chat
  const roomId = useMemo(() => {
    if (chatType === "group") {
      return `group_${groupName}`;
    } else {
      // Chat 1-1: Sắp xếp tên 2 người để ID luôn giống nhau dù ai mở chat trước
      const participants = [currentUser, targetUser].sort();
      return `direct_${participants[0]}_${participants[1]}`;
    }
  }, [chatType, currentUser, targetUser, groupName]);

  // 3. Lắng nghe tin nhắn theo Room ID
  useEffect(() => {
    if (!roomId) return;

    // Đường dẫn collection sẽ là: rooms/{roomId}/messages
    const messagesRef = collection(db, "rooms", roomId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Message,
      );
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [roomId]);

  // 4. Gửi tin nhắn vào đúng Room
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    try {
      const messagesRef = collection(db, "rooms", roomId, "messages");
      await addDoc(messagesRef, {
        text: newMessage,
        sender: currentUser,
        createdAt: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn: ", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Ứng dụng Chat (1-1 & Group)</h2>

      {/* Cấu hình User hiện tại */}
      <div
        style={{
          marginBottom: "15px",
          padding: "10px",
          background: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <strong>Tôi là: </strong>
        <input
          type="text"
          value={currentUser!}
          onChange={(e) => setCurrentUser(e.target.value)}
          style={{ padding: "5px", marginLeft: "10px" }}
        />
      </div>

      {/* Chọn chế độ Chat */}
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <label>
          <input
            type="radio"
            checked={chatType === "direct"}
            onChange={() => setChatType("direct")}
          />{" "}
          Chat 1-1
        </label>
        <label>
          <input
            type="radio"
            checked={chatType === "group"}
            onChange={() => setChatType("group")}
          />{" "}
          Chat Nhóm
        </label>
      </div>

      {/* Nhập đối tượng chat tùy theo chế độ */}
      <div style={{ marginBottom: "20px" }}>
        {chatType === "direct" ? (
          <div>
            <label>Nhắn tin với ai? </label>
            <input
              type="text"
              value={targetUser}
              onChange={(e) => setTargetUser(e.target.value)}
              style={{ padding: "5px" }}
            />
          </div>
        ) : (
          <div>
            <label>Tên nhóm chat: </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={{ padding: "5px" }}
            />
          </div>
        )}
      </div>

      {/* Khung hiển thị tin nhắn */}
      <div
        style={{
          height: "350px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "15px",
          background: "#fff",
        }}
      >
        {messages.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>
            Chưa có tin nhắn nào trong phòng này.
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems:
                msg.sender === currentUser ? "flex-end" : "flex-start",
            }}
          >
            <small style={{ color: "#888", marginBottom: "2px" }}>
              {msg.sender}
            </small>
            <div
              style={{
                background: msg.sender === currentUser ? "#0084ff" : "#e4e6eb",
                color: msg.sender === currentUser ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "15px",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Form gửi tin nhắn */}
      <form onSubmit={sendMessage} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Nhập tin nhắn tới ${chatType === "direct" ? targetUser : groupName}...`}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "8px",
            background: "#0084ff",
            color: "#fff",
            border: "none",
          }}
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default AdvancedChatTest;
