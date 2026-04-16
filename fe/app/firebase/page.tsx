"use client"
import { ref, onValue, set, push, serverTimestamp} from "firebase/database";
import  { db } from '@/lib/firebase'
import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

const starCountRef = ref(db, 'post/' );

onValue(starCountRef, (snapshot) =>{
    const data = snapshot.val();
    console.log("Dữ liệu nè :", data);
})

type Message = {
  id: string;
  sender: string;
  text: string;
  content : string;
  timestamp?: number;
}

export default function FirebaseApp(){
    const {user, loading } = useAuth();
    const user1inputRef = useRef<HTMLInputElement | null>(null);
    const user2inputRef = useRef<HTMLInputElement | null>(null);
    const [chatData, setChatData] = useState<Message[]>([]);

    const sendMessage = useCallback((roomId: string, text: string, user: string) => {
        console.log("Clicked");
        const messagesRef = ref(db, 'message/' + roomId);
        const newMessagesRef = push(messagesRef);
        set(newMessagesRef, {
            sender: user,
            text: text,
            timestamp: serverTimestamp() 
        })
    }, []);
    useEffect(()=>{
        const messageRef = ref(db, 'message/');
        const unsubscribe = onValue(messageRef, (snapshot) => {
            const data = snapshot.val().room1;
            if(data){
                const messageList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setChatData(messageList);
            }
            console.log("Message data: ", data);
            // console.log("Message data: ", data.room1);

        });
        return unsubscribe;
    },[])


    return<>
        <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
            <div className="mx-auto w-full h-200 overflow-y-auto max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                    <p className="text-sm font-semibold text-slate-500">Firebase Chat</p>
                </div>

                <div className="border-t border-slate-200 bg-slate-50 px-4 py-5">
                    <p className="mb-4 text-sm text-slate-500">Chat messages will appear here.</p>
                    <div className="space-y-3">
                        {chatData.map((msg) => {
                            const isMe = msg.sender === user?.displayName;

                            return (
                                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${isMe ? "bg-blue-600 text-white rounded-br-md" : "bg-white text-slate-800 rounded-bl-md border border-slate-200"}`}>
                                        <p className={`mb-1 text-xs font-semibold ${isMe ? "text-blue-100" : "text-slate-500"}`}>
                                            {msg.sender}
                                        </p>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                    <div className="space-y-2 flex">
                        <input
                            type="text"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400"
                            placeholder="user1_message"
                            ref={user1inputRef}
                        />
                        <button
                            onClick={() => sendMessage("room1", user1inputRef.current?.value || "", user?.displayName || "")}
                            className="w-30 rounded-2xl bg-blue-600 px-4 py-3 font-small text-white transition hover:bg-blue-700 cursor-pointer"
                        >
                            User 1
                        </button>
                    </div>
            </div>
        </div>
    </>
}