import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useColor } from '../ColorContext';
import axios from 'axios';
import '../styles/atemubung.css';
import videoSrc from '../asset/videos/vid.mp4';
import { updateStatistik} from '../services/user';

const Atemubung = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();
  const videoRef = useRef(null);
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [userCount, setUserCount] = useState(null);

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleSubmit = async (feeling, incrementCount = false) => {
    const feelingToSubmit = feeling || 'no selection';
    console.log('Submitting feeling:', feelingToSubmit); 
    try {
      const response = await updateStatistik(
        new Date().toISOString(),
        incrementCount ? 1 : 0,
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
      handleSubmit(selectedFeeling, true);
    };

    if (video) {
      video.addEventListener('ended', handleEnded);
      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          navigate('/'); 
          return;
        }

        const config = {
          headers: {
            'x-auth-token': token
          }
        };
        const response = await axios.get('http://localhost:5000/api/breath/getcount', config);
        console.log('Response data:', response.data);
        setUserCount(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        
      }
    };

    fetchUserData();


  }, []); 

  const handleCheckboxChange = (event) => {
    const newFeeling = event.target.value;
    console.log('Checkbox selected:', newFeeling); 
    setSelectedFeeling(newFeeling);
    handleSubmit(newFeeling, false); 
  };

  return (
    <div style={{ backgroundColor }}>
      <div className="atemubung-container">
        <div className="atemubung-title">
          <h1>Atemübung</h1>
        </div>
        <div className="speech-bubble">
          Hallo, ich bin Andy. Ich bin dein Coach. 
          Heute helfe ich dir bei Atemübungen. Diese Übung heißt 4-7-8 Technik. 
          Diese Technik hilft dir, deine Angst und deinen Stress abzubauen. 
          Bitte übe sie mindestens 4 Mal am Tag, um den besten Effekt zu erzielen.
        </div>
        <div className="atemubung-content">
          <div className='vid-container'>
          <FontAwesomeIcon icon={faUser} className='iconspeak' style={{
                            marginTop: '5px',
                            fontSize: '72px',
                            color: 'white'}}/>
            <video ref={videoRef} width="230" controls={false}>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="atemubung-btn">
            <button className="btn" type="button" 
            style={{marginBottom: "0px"}}
            onClick={handleStart}>Starten</button>
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
          <button className="btn" type="button" onClick={() => navigate('/menu')}>Komm zurück</button>
        </div>
      </div>
    </div>
  );
}

export default Atemubung;
