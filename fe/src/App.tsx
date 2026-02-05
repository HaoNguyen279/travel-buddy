import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    
    return () => unsubscribe();
  }, []);

  const handleLogin = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {user ? (
        <div>
          {/* 3. TS sẽ hiểu user lúc này không còn là null nhờ check bên trên */}
          <h2>Chào, {user.displayName}!</h2>
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt="avatar" 
              style={{ borderRadius: '50%', width: '50px' }}
            />
          )}
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Đăng nhập bằng Google</button>
      )}
    </div>
  );
}

export default App;