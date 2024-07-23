import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


import { useColor } from '../ColorContext';
import '../styles/menu2.css'

const Menu2 = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();

  return (
    <div className="menu2-container"  style={{ backgroundColor }}>
        <div className="menu2-title">
            <h1>Atemübungen</h1>
        </div>
        <div style={{display: 'flex', margin: '0 20px'}}>
            <FontAwesomeIcon icon={faUser} className='iconspeak' style={{
                fontSize: '72px',
                color: 'white',
                marginTop: '30px'
                }} />
            <div className='menu2-speech-bubble'>
            Hallo, ich bin Harmony, dein Coach. <br/>
            Diese App enthält 4 Übungen, die auf deinem Gesundheitszustand basieren. 
            Wähle die richtige Übung, um deine Gesundheit zu verbessern.
            </div>
        </div>
        <div className="menu2-list">
            <div className="item" onClick={() => navigate('/atemubung')}>Stress Management
            </div>
            <div className="item" onClick={() => navigate('/schlaf')}>Besserer Schlaf
            </div>
            <div className="item" onClick={() => navigate('/herz')}>Herz-Kreislauf-Gesundheit
            </div>
            <div className="item" onClick={() => navigate('/lungen')}>Lungenkapazität
            </div>
        </div>
        <div className="menu2-btn">
            <button className="btn" type="submit" onClick={() => navigate('/menu')}>Zurück</button>
        </div>
    </div>
  );
}

export default Menu2;