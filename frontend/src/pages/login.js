import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getUser } from '../services/user'; 
import { useColor } from '../ColorContext';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { changeBackgroundColor } = useColor();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const token = await login(username, password); 
      localStorage.setItem('token', token); 
      const userData = await getUser(); 
      const userBackgroundColor = userData.color || '#EDDCFF'; 
      changeBackgroundColor(userBackgroundColor); 
      navigate('/menu');
    } catch (error) {
      setError('Invalid credentials');
      console.error(error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <h1>Willkommen! <br/> Melde dich bei BreathHarmony an!</h1>
      </div>
      <form id="login-form" onSubmit={handleLoginSubmit}> 
        <div className="login-input">
          <label htmlFor="username">Benutzername</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="login-btn">
          <button className="btn" type="submit">Anmelden</button>
          <button className="btn" type="button" onClick={handleRegisterClick}>Registrieren</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
