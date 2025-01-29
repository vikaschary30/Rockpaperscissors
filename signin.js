import React, { useState } from 'react';
import person2 from './images/person2.png'
import key2 from './images/key2.png'
import './login.css';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignUp = () => {
    if(username!=='' && password!=='' && email!==''){
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
        if(!emailpattern.test(email)){
          alert('please enter email address correctly');}
        else{
          alert('Signed in succesfully');
          window.location.href='/login';
        }
    }
    else{
      alert('please fill the details to have fun');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <div>
        <h1 className="signin">SIGN UP</h1>
        <div className='con1'>
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
          <br />
          <div className="user">
            <img src={person2} alt="email-icon" className="acclogo" />
            <p className="username">Email ID</p>
            <input
              type="text"
              placeholder="Enter Email Address"
              onKeyDown={handleKeyDown}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="Inputp"
            />
          </div>
          <p className="error"></p>
          <br />
          <button className="loginBtn" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
    </div>
  );
};

export default Signin;
