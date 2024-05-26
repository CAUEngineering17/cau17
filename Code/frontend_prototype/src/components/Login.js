// src/components/Login.js
import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: username, password: password }),
    });
    const data = await response.json();

    if (data) {
      setIsLoggedIn(true);
      setUser(username);
      localStorage.setItem('user', username); // 로그인 정보 저장
    } else {
      console.error('로그인 실패');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser('');
    setUsername('');
    setPassword('');
    localStorage.removeItem('user'); // 로그아웃 시 로그인 정보 제거
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div className="login-info">
          <p>환영합니다, {user}님!</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
