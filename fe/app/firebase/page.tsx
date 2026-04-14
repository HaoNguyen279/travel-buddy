"use client"
import { ref, onValue, set} from "firebase/database";
import  { db } from '@/lib/firebase'
import { useCallback, useEffect, useState } from "react";
import { s } from "framer-motion/client";
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

    const [chatData, setChatData] = useState<Message[]>([]);

    const handleClick = useCallback((chatId : string) => {
        console.log("Clicked");
        set(ref(db, 'message/' + chatId), {
            title: "Hello test",
            sender: "User 1",
            content: "Test realtime",
            createdAt: Date.now()
        })
    }, []);
    useEffect(()=>{
        const messageRef = ref(db, 'message/');
        const unsubscribe = onValue(messageRef, (snapshot) => {
            const data = snapshot.val();
            if(data){
                const messageList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setChatData(messageList);
            }
            console.log("Message data: ", data);

        });
        return unsubscribe;
    },[])


    return<>
        <button onClick={() => handleClick(Date.now().toString())} className="text-gray-800 px-4 py-2 rounded">User 1</button>
        <button onClick={() => handleClick(Date.now().toString())} className="text-gray-800 px-4 py-2 rounded">User 2</button>
        <p className="text-gray-900">Chat messages will appear here.</p>
        {chatData.map((msg) => (
            <div key={msg.id} className="message">
            <b className="text-gray-900">{msg.id}:</b> <span className="text-gray-700">{msg.content}</span>
            </div>
        ))}
    </>
}