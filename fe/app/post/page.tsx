"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


type User ={
    username: string,
    full_name: string,
    avatar_url: string
}
export type PostProps = {
  post_id: string;         
  user_id: string;        
  place_id: number;      
  content: string;
  image_url?: string | null; 
  createdAt: Date;           
  updatedAt: Date;
  
  author: User;             

};
const Article = (post :  PostProps) =>{
    const {user_id, place_id, content, author} = post;
    const [timeAgo, setTimeAgo] = useState("");
    const calcTimeAgo = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if(seconds < 60)
            return seconds.toString() + " giây trước";
        else if(seconds < 3600)
            return (seconds/60).toFixed(0) + " phút trước";
        else if(seconds < 86400)
            return (seconds/3600).toFixed(0) + " giờ trước";
        else
            return (seconds/86400).toFixed(0) + " ngày trước";
    }
    // setTimeAgo(calcTimeAgo(post.createdAt.toString()));
    // AI gen tailwind+html temp, tí map lại bằng data sau
    return  <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={author.avatar_url}
                    alt={author.full_name}
                    width={11}
                    height={11}
                    className="rounded-full h-11 w-11 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{author.full_name}</p>
                    <p className="text-xs text-slate-500">{calcTimeAgo(post.createdAt.toString())} · Đà Lạt</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">•••</button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                {content}
              </p>
            </div>
            <div className="h-72 bg-gradient-to-br from-emerald-200 via-cyan-200 to-sky-300 sm:h-96" />
            <div className="p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between text-xs text-slate-500 sm:text-sm">
                <span>2.3K lượt thích</span>
                <span>318 bình luận · 42 lượt chia sẻ</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm font-medium">
                <button className="rounded-xl bg-slate-100 py-2 text-slate-600 hover:bg-slate-200">Thích</button>
                <button className="rounded-xl bg-slate-100 py-2 text-slate-600 hover:bg-slate-200">Bình luận</button>
                <button className="rounded-xl bg-slate-100 py-2 text-slate-600 hover:bg-slate-200">Chia sẻ</button>
              </div>
            </div>
          </article>
}

export default function Post() {
    const [postData, setPostData] = useState<PostProps[]>([]);
    useEffect(()=>{
        fetch('http://localhost:3000/post')
        .then(res => res.json())
        .then(data => setPostData(data));
    },[]);
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0f2fe_0%,_#ffffff_40%,_#fef9c3_100%)] pb-16">
      <div className="mx-auto grid w-full max-w-7xl">
        <section className="w-[50%] mx-auto space-y-6 py-10">

            {postData.map((post) => (
                <Article key={post.post_id} {...post}/>
            ))}
        </section>
      </div>
    </main>
  );
}
