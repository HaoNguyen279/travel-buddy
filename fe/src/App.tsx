import React, { useState, useEffect } from 'react';
import { auth, googleProvider,  signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';
import { signInWithPopup, updateProfile } from 'firebase/auth';
import type { User } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

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



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Đăng ký thành công!");
        await updateProfile(auth.currentUser!, {
          displayName: "Tên Người Dùng",
          photoURL: "https://example.com/avatar.png"
    });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Đăng nhập thành công!");
      }
    } catch (error: any) {
      console.error("Lỗi:", error.code);
      alert("Lỗi: " + error.message);
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

    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isRegistering ? 'Đăng ký' : 'Đăng nhập'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">
          {isRegistering ? 'Tạo tài khoản' : 'Đăng nhập'}
        </button>
      </form>
      
      <button 
        onClick={() => setIsRegistering(!isRegistering)} 
        style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
      >
        {isRegistering ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
      </button>
    </div>
    </div>
  );
}

export default App;