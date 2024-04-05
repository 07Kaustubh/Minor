import React, { useState } from 'react';
import './PopupForm.css';
import { loginUser, signupUser, setAuthToken } from './services/api'; // Import login, signup functions and setAuthToken from api.js
import { useAuth } from './services/auth'; // Import useAuth hook from auth.js

const PopupForm = ({ onClose, onLoginSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Logging in...');
      const { token } = await loginUser({ email, password });
      console.log('Login successful. Token:', token);
      // Store JWT token in local storage
      localStorage.setItem('token', token);
      // Set token in request headers
      setAuthToken(token);
      // Invoke the onLoginSuccess callback
      login();
      onLoginSuccess();
      setError(null);
      // Handle successful login (redirect, show success message, etc.)
    } catch (error) {
      // Handle login error (display error message, etc.)
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
      setPassword(''); // Clear password field
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Signing up...');
      const { token } = await signupUser({ firstName, lastName ,email, password });
      console.log('Signup successful. Token:', token);
      // Store JWT token in local storage
      localStorage.setItem('token', token);
      // Set token in request headers
      setAuthToken(token);
      // Handle successful signup (redirect, show success message, etc.)
      onLoginSuccess();
    } catch (error) {
      // Handle signup error (display error message, etc.)
      console.error('Signup error:', error);
      setError('An error occurred during signup. Please try again.');
      setPassword(''); // Clear password field
    }
  };
  

  const switchForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="popup-container">
      <div className="popup-form">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        {error && <p className="error-message">{error}</p>}
        {showLogin ? (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account?{' '}
              <button className="switch-btn" onClick={switchForm}>
                Signup
              </button>
            </p>
          </>
        ) : (
          <>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              /> 
              <button type="submit">Signup</button>
            </form>
            <p>
              Already have an account?{' '}
              <button className="switch-btn" onClick={switchForm}>
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupForm;