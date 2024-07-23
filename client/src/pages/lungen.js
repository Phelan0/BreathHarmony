import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useColor } from '../ColorContext';
import '../styles/lungen.css'

const Lungen = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();
  const [selectedFeeling, setSelectedFeeling] = useState('');

  const handleFeelingChange = (event) => {
    setSelectedFeeling(event.target.value);
  };

  return (
    <div className="lungen-container" style={{ backgroundColor }}>
      <div className="lungen-title">
        <h1>Lungenkapazität</h1>
      </div>
      <div style={{ display: 'flex' }}>
        <FontAwesomeIcon icon={faUser} className='iconspeak' style={{
          fontSize: '72px',
          color: 'white',
          marginTop: '30%'
        }} />
        <div className='lungen-speech-bubble'>
        Es geht um die Rippenstreckung-Technik, die dir hilft, deine Lunge zu verbessern. <br/><br/>

        Für diese Übung stehst du aufrecht und atmest aus, bis deine Lungen leer sind. 
        Dann atmest du allmählich ein und füllst deine Lungen so weit wie möglich. 
        Halte den Atem 20 Sekunden lang an oder so lange, wie du kannst. <br/> <br/>

        Während du zählst, lege deine Hände auf deine Hüften, mit den Daumen nach vorne und den kleinen Fingern am unteren Rücken. <br/> <br/>

        Sobald du den Atem 20 Sekunden lang gehalten hast, atme langsam aus und kehre in eine entspannte Position zurück. 
        Wiederhole die Übung 3 Mal. Viel Erfolg!
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
      <div className="lungen-btn">
        <button className="btn" type="submit" onClick={() => navigate('/menu2')}>Zurück</button>
      </div>
    </div>
  );
}

export default Lungen;
