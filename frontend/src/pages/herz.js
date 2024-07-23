import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useColor } from '../ColorContext';
import '../styles/herz.css'

const Herz = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();
  const [selectedFeeling, setSelectedFeeling] = useState('');

  const handleFeelingChange = (event) => {
    setSelectedFeeling(event.target.value);
  };

  return (
    <div className="herz-container" style={{ backgroundColor }}>
      <div className="herz-title">
        <h1>Herz-Kreislauf-Gesundheit</h1>
      </div>
      <div style={{ display: 'flex' }}>
        <FontAwesomeIcon icon={faUser} className='iconspeak' style={{
          fontSize: '72px',
          color: 'white',
          marginTop: '30%'
        }} />
        <div className='herz-speech-bubble'>
        Es geht um die Nasenatmung-Technik, die dir hilft, den Blutdruck zu senken. 
        Für das Atmen durch das Nasenloch beginne damit, dass du mit deinem rechten Daumen dein rechtes Nasenloch schließt. 
        Verstopfe dein Nasenloch nicht; drücke stattdessen ganz sanft auf den weichen Knorpel der Nase, um es geschlossen zu halten. 
        Atme durch dein linkes Nasenloch ein, blockiere dann das linke Nasenloch mit deinem rechten Ringfinger und 
        atme durch dein rechtes Nasenloch aus. Atme dann durch dein rechtes Nasenloch ein, blockiere dein rechtes Nasenloch und 
        atme durch dein linkes Nasenloch aus. <br/> <br/>

        Übe diese Atemtechnik 5 Minuten lang. Viel Erfolg!
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
      <div className="herz-btn">
        <button className="btn" type="submit" onClick={() => navigate('/menu2')}>Zurück</button>
      </div>
    </div>
  );
}

export default Herz;
