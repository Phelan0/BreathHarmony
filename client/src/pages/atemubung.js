import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useColor } from '../ColorContext';
import '../styles/atemubung.css';
import videoSrc from '../asset/videos/vid.mp4';
import { updateStatistik } from '../services/user';

const Atemubung = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();
  const videoRef = useRef(null);
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [playCount, setPlayCount] = useState(0);
  const [playTimes, setPlayTimes] = useState(1);

  const handleStart = () => {
    setPlayTimes(1);
    setPlayCount(0);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleStart15Times = () => {
    setPlayTimes(15);
    setPlayCount(0);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleSubmit = async (feeling, incrementCount = 0) => {
    const feelingToSubmit = feeling || 'no selection';
    console.log('Submitting feeling:', feelingToSubmit); 
    try {
      const response = await updateStatistik(
        new Date().toISOString(),
        incrementCount,
        feelingToSubmit
      );

      console.log('Statistik updated successfully', response);
    } catch (error) {
      console.error('Error updating statistik:', error);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      if (playCount < playTimes - 1) {
        setPlayCount(prevCount => prevCount + 1);
        video.play();
      } else {
        handleSubmit(selectedFeeling, playTimes);
      }
    };

    if (video) {
      video.addEventListener('ended', handleEnded);
      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }

  }, [playCount, playTimes, selectedFeeling, navigate]);

  const handleCheckboxChange = (event) => {
    const newFeeling = event.target.value;
    console.log('Checkbox selected:', newFeeling); 
    setSelectedFeeling(newFeeling);
    handleSubmit(newFeeling, 0); 
  };

  return (
    <div style={{ backgroundColor }}>
      <div className="atemubung-container">
        <div className="atemubung-title">
          <h1>Atemübung</h1>
        </div>
        <div className="speech-bubble">
          Hallo! Ich bin Harmony, dein Coach.<br/>
          Heute geht es um die 4-7-8-Technik, die dir hilft, dein Stresslevel zu senken. 
          Atme 4 Sekunden ruhig durch die Nase ein. Halte dein Atmen für 7 Sekunden an und atme 
          anschließend 8 Sekunden langsam durch den Mund aus. 
          Wir empfehlen den gesamten Vorgang 15-mal zu wiederholen.<br/>
          Der Starten Button lässt die Übung einmal durchlaufen und der Button Mehrmals Üben 15-mal. 
          In der Statistik kannst du deinen Fortschritt überwachen.<br/>
          Du kannst die Übung beliebig oft am Tag wiederholen. Viel Erfolg!
        </div>
        <div className="atemubung-content">
          <div className='vid-container'>
            <FontAwesomeIcon icon={faUser} className='iconspeak' style={{
              marginTop: '5px',
              fontSize: '72px',
              color: 'white'
            }} />
            <video ref={videoRef} width="230" controls={false}>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="start-btn-container">
            <button className="start-btn" type="button"
              style={{ marginBottom: "0px" }}
              onClick={handleStart}>Starten (+1)</button>

            <button className="start-btn" type="button"
              style={{ marginBottom: "0px" }}
              onClick={handleStart15Times}>Mehrmals üben (+15)</button>
          </div>
          <div className="checkbox-container">
            <p>Wie fühlst du dich nach der Übung?</p>
            <label>
              <input 
                type="checkbox" 
                name="feeling" 
                value="gut" 
                checked={selectedFeeling === 'gut'}
                onChange={handleCheckboxChange}
              /> Gut
            </label>
            <label>
              <input 
                type="checkbox" 
                name="feeling" 
                value="normal" 
                checked={selectedFeeling === 'normal'}
                onChange={handleCheckboxChange}
              /> Geht so
            </label>
            <label>
              <input 
                type="checkbox" 
                name="feeling" 
                value="schlecht" 
                checked={selectedFeeling === 'schlecht'}
                onChange={handleCheckboxChange}
              /> Schlecht
            </label>
          </div>
        </div>
        <div className="atemubung-btn">
          <button className="btn" type="button" onClick={() => navigate('/menu')}>Zurück</button>
        </div>
      </div>
    </div>
  );
}

export default Atemubung;
