import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useColor } from '../ColorContext';
import '../styles/kontakt.css'

const Kontakt = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();

  return (
    <div  style={{ backgroundColor }}>
        <div className="kontakt-container" >
            <div className="kontakt-title">
                <h1>Kontakt</h1>
            </div>
            <div className="kontakt-content">
                
            </div>
            <div className="kontakt-btn">
                <button className="btn" type="submit" onClick={() => navigate('/menu')}>Komm zurück</button>
            </div>
        </div>
    </div>
  );
}

export default Kontakt;