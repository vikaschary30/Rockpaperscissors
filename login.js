import React, { useState } from 'react';
import person2 from './images/person2.png'
import key2 from './images/key2.png'
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const regu = localStorage.getItem('username');
    const regp = localStorage.getItem('password');

    if (username === regu) {
      if (password === regp) {
        alert('Logged in succesfully.');
        window.location.href='/start';
      } else {
        setError('Password is incorrect!!!');
      }
    } else {
      setError('Username is incorrect!!!');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div>
        <h1 className="login">LOGIN</h1>
        <div className='con2'>
        <div className="user">
          <img src={person2} alt="user-icon" className="acclogo" />
          <p className="username">Username</p>
          <input
            type="text"
            placeholder="Enter Username"
            onKeyDown={handleKeyDown}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="Inputu"
          />
        </div>
        <br />
        <div className="user">
          <img src={key2} alt="password-icon" className="acclogo" />
          <p className="username">Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            onKeyDown={handleKeyDown}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="Inputp"
          />
        </div>
        <p className="error">{error}</p>
        <br />
        <button className="loginBtn" onClick={handleLogin}>
          Login
        </button>
        </div>
      </div>
  );
};

export default Login;