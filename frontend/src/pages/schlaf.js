import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useColor } from '../ColorContext';
import '../styles/schlaf.css'

const Schlaf = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();
  const [selectedFeeling, setSelectedFeeling] = useState('');

  const handleFeelingChange = (event) => {
    setSelectedFeeling(event.target.value);
  };

  return (
    <div className="schlaf-container" style={{ backgroundColor }}>
      <div className="schlaf-title">
        <h1>Besserer Schlaf</h1>
      </div>
      <div style={{ display: 'flex' }}>
        <FontAwesomeIcon icon={faUser} className='iconspeak' style={{
          fontSize: '72px',
          color: 'white',
          marginTop: '30%'
        }} />
        <div className='schlaf-speech-bubble'>
          Es geht um die Zwerchfellatmung-Technik, die dir hilft, besser zu schlafen. 
          Lege dich auf eine flache Oberfläche, mit gebeugten Knien. 
          Lege ein Kissen unter deinen Kopf und Kissen unter deine Knie. 
          Lege eine Hand auf deine obere Brust. Lege die andere Hand auf deinen Bauch direkt unterhalb deines Brustkorbs. 
          Atme durch die Nase ein. Ziehe den Atem in deinen Bauch. Die Hand auf deinem Bauch wird sich mit deinem Atem heben. 
          Deine Brust sollte still bleiben. <br /> <br />

          Atme langsam aus. Dein Bauch sollte sich wieder senken. Deine Hand auf deiner oberen Brust sollte still bleiben. <br /> <br />

          Übe diese Atemtechnik 5 bis 10 Minuten lang, 3 bis 4 Mal pro Tag. Viel Erfolg!
        </div>
      </div>
      <div className="checkbox-container">
        <p>Wie fühlst du dich nach der Übung?</p>
        <label>
          <input
            type="radio"
            name="feeling"
            value="gut"
            checked={selectedFeeling === 'gut'}
            onChange={handleFeelingChange}
          /> Gut
        </label>
        <label>
          <input
            type="radio"
            name="feeling"
            value="normal"
            checked={selectedFeeling === 'normal'}
            onChange={handleFeelingChange}
          /> Geht so
        </label>
        <label>
          <input
            type="radio"
            name="feeling"
            value="schlecht"
            checked={selectedFeeling === 'schlecht'}
            onChange={handleFeelingChange}
          /> Schlecht
        </label>
      </div>
      <div className="schlaf-btn">
        <button className="btn" type="submit" onClick={() => navigate('/menu2')}>Zurück</button>
      </div>
    </div>
  );
}

export default Schlaf;
