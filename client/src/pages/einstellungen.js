import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useColor } from '../ColorContext';
import '../styles/einstellungen.css'

const Einstellungen = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();

  return (
    <div style={{ backgroundColor }}>
        <div className="einstellungen-container" >
            <div className="einstellungen-title">
                <h1>Einstellungen</h1>
            </div>
            <div className="einstellungen-content">
                <div className="item" onClick={() => navigate('/color')}>Hintergrundfarbe ändern</div>
                <div className="item" onClick={() => navigate('/changepass')}>Passwort ändern</div>
                <div className="item" onClick={() => navigate('/changeprofil')}>Profil ändern</div>
            </div>
            <div className="einstellungen-btn">
                <button className="btn" type="submit" onClick={() => navigate('/menu')}>Komm zurück</button>
            </div>
        </div>
    </div>
  );
}

export default Einstellungen;