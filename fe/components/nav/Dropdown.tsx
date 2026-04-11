'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { signOut , getAuth} from 'firebase/auth';
import { useRouter } from 'next/navigation';
// ai gen UI/tailwindcss, sửa lại handle function các item, 
type DropdownItem = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
};

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
    const {user, loading} = useAuth();
    const router = useRouter();
    const auth = getAuth();
    const handleLogout= async ()=>{
        await signOut(auth);
        router.replace("/login");

    }
  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const items: DropdownItem[] = [
    {
      label: 'Thông tin cá nhân',
      icon: <User className="h-4 w-4" />,
      onClick: () => {
        console.log('Go profile');
        setOpen(false);
      },
    },
    {
      label: 'Cài đặt',
      icon: <Settings className="h-4 w-4" />,
      onClick: () => {
        console.log('Go settings');
        setOpen(false);
      },
    },
    {
      label: 'Đăng xuất',
      icon: <LogOut className="h-4 w-4" />,
      danger: true,
      onClick: () => {
        handleLogout();
        setOpen(false);
      },
    },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger button */}
      {user ? <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl  bg-white px-4 py-2.5 text-sm font-medium text-slate-700  transition hover:bg-slate-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
       <User className="h-4 w-4" /> Xin chào, {user.displayName}!
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button> : <></>}

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-1 shadow-lg transition-all duration-200 ease-out
        ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-95 opacity-0'
        }`}
      >
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition
              ${
                item.danger
                  ? 'text-rose-600 hover:bg-rose-50'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}