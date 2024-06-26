import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useColor } from '../ColorContext';
import '../styles/editcolor.css';

const Edit = () => {
  const navigate = useNavigate();
  const { backgroundColor, changeBackgroundColor } = useColor();

  const setBlueBackground = () => {
    changeBackgroundColor('#000dfd'); 
  };

  const setRedBackground = () => {
    changeBackgroundColor('#e74c3c'); 
  };

  const setYellowBackground = () => {
    changeBackgroundColor('#ffff00'); 
  };

  const setGreenBackground = () => {
    changeBackgroundColor('#00ba4d'); 
  };

  const setPinkBackground = () => {
    changeBackgroundColor('#ff69b4'); 
  };

  const setOrangeBackground = () => {
    changeBackgroundColor('#ffa500'); 
  };

  const setBrownBackground = () => {
    changeBackgroundColor('#8b4513'); 
  };

  const setGrayBackground = () => {
    changeBackgroundColor('#808080'); 
  };

  const setPurpleBackground = () => {
    changeBackgroundColor('#800080');
  };

  const resetBackground = () => {
    changeBackgroundColor('#EDDCFF'); 
  };

  return (
    <div style={{ backgroundColor }}>
      <div className="kontakt-container">
        <div className="kontakt-title">
          <h1>Change Background Color</h1>
        </div>
        <div className="kontakt-content">
          <button className="blue" onClick={setBlueBackground}>Blue</button>
          <button className="red" onClick={setRedBackground}>Red</button>
          <button className="yellow" onClick={setYellowBackground}>Yellow</button>
          <button className="green" onClick={setGreenBackground}>Green</button>
          <button className="pink" onClick={setPinkBackground}>Pink</button>
          <button className="orange" onClick={setOrangeBackground}>Orange</button>
          <button className="brown" onClick={setBrownBackground}>Brown</button>
          <button className="gray" onClick={setGrayBackground}>Gray</button>
          <button className="purple" onClick={setPurpleBackground}>Purple</button>
          <button className="default" onClick={resetBackground}>Default</button>
        </div>
        <div className="kontakt-btn">
          <button className="btn" type="submit" onClick={() => navigate('/einstellungen')}>Komm zurück</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
