import React, { useState } from 'react'
import axios from "axios"
import './Form.css'

function Form() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRequest = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      username,
      email,
      password
    }

    try {
      const response = await axios.post("http://localhost:5500/api/v1/users/register", payload,
        {
          withCredentials: true
        }
      );

      console.log("Response: ", response.data);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <form onSubmit={handleRequest}>
      <div>
        <h1>Register Form</h1>
        {/* username */}
        <label htmlFor="Username">Username</label>
        <input onChange={(e) => {
          setUsername(e.target.value)
        }}
          className='user-container'
          type="text"
          name='Username'
          id='username'
          value={username}
          placeholder='Enter your name' />

        {/* email */}
        <label htmlFor="Email">Email</label>
        <input onChange={(e) => {
          setEmail(e.target.value)
        }}
          className='email-container'
          type="email"
          name='Email'
          id='email'
          value={email}
          placeholder='Enter your email' />

        {/* password */}
        <label htmlFor="Password">Password</label>
        <input onChange={(e) => {
          setPassword(e.target.value)
        }}
          className='password-container'
          type="password"
          name='Password'
          id='Password'
          value={password}
          placeholder='Enter your password' />
        {/* confirm Password */}
        <label htmlFor="confirm-password">Confirm Password</label>
        <input onChange={(e) => {
          setConfirmPassword(e.target.value)
        }}
          className='confirm-password-container'
          type="password"
          name='confirm-password'
          id='confirm-password'
          value={confirmPassword}
          placeholder='Enter confirm password' />

        <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default Form