import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../services/user'; 
import { useColor } from '../ColorContext';
import '../styles/changepass.css';

const Changepass = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangepassSubmit = async (event) => {
    event.preventDefault(); 

    try {
      await changePassword(newPassword); 
      navigate('/');  
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to update password'); 
    }
  };

  const handleChangepassClick = () => {
    navigate('/einstellungen');  
  };

  return (
    <div style={{ backgroundColor }}>
      <div className="changepass-container">
        <div className="changepass-title">
          <h1>Passwort ändern</h1>
        </div>
        <div className="changepass-content">
          <form id="changepass-form" onSubmit={handleChangepassSubmit}>
            <div className="changepass-input">
              <label htmlFor="password">Neues Passwort</label>
              <input
                type="password"
                id="password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="changepass-btn">
              <button className="btn" type="submit">Aktualisieren</button>
              <button className="btn" type="button" onClick={handleChangepassClick}>Komm zurück</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Changepass;
