import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import Home from './Home';
import { Button } from 'reactstrap';

const LogIn = () => {
  const [password, setPassword] = useState('');
  const [userid, setUserId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [failedMessage, setFailedMessage] = useState('');

  const navigate = useNavigate();

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    fetch('http://localhost:8083/api/logIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid, password }),
    })
      .then((response) => {
        if (response.status === 200) {
        
          setSuccessMessage('Login successful');
          navigate("/courses");

        }
        return response.json();
      })
      .then((data) => {
     
        console.log(data);
      })
      .catch((error) => {
        if (error.status !== 200) {
          setFailedMessage('Something went wrong... try again!');
        }
        console.error('Error:', error);
      });
  };

  return (
    <div>

<h1 id='header' > LogIn to Learning Academy </h1>
    <div className="login-container">
      <h2>Login to Your Account</h2>

      <form onSubmit={handleSubmit}>
        <br />
        <label>
          Userid: <br />
          <input type="text" value={userid} onChange={handleUserIdChange} required />
        </label>
        <br />
        <br />
        <label>
          Password: <br />
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <br />
        <br />
        <div className="login-container-btn">
          <Button type="submit" color='primary text-black'>LogIn</Button>
          <Button type="button" style={{backgroundColor:'rgba(143, 145, 136, 0.356)',color:'black'}} onClick={() => navigate("/signup")}>Go to Signup</Button>
        </div>

        <br />
        <br />

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {failedMessage && <p style={{ color: 'red' }}>{failedMessage}</p>}

      </form>
    </div>
    </div>
  );
};

export default LogIn;
