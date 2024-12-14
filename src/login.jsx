import React, { useState } from 'react';
import './main.scss'; // Import the CSS file for styling
import { useNavigate } from 'react-router';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://quotes-app-84u8.onrender.com/api/login`;

    try {
      // Change the request method from GET to POST
      const result = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json", // Ensure the correct Content-Type header
        },
      });

      if (result.data.Status === "success") {
        navigate('/quotes'); // Navigate to the /test route after successful login
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className='login'>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
