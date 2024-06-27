import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ava from '../asset/images/avatar.jpg'

import { useColor } from '../ColorContext';
import '../styles/profil.css';

const Profile = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(ava);
  const { backgroundColor } = useColor();
  const [userData, setUserData] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append('avatar', file);
    }
  };

  useEffect(() => {
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
        const response = await axios.get('http://localhost:5000/api/breath/getuser', config);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <div style={{ backgroundColor }}>
      <div className="profil-container">
        <div className="profil-title">
          <h1>Mein Profil</h1>
        </div>
        <div className="profil-ava">
            <div className='profil-ava-img'>
                  <img src={avatar} alt="Avatar Preview" />
            </div>
            <form>
                  <div>
                  <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="avatar" style={{
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '5px 20px',
            borderRadius: '5px',
            display: 'inline-block',
            textAlign: 'center'
          }}>
            Choose File
          </label>
                  </div>
            </form>
        </div>
        <div className="profil-list">
          <div className="profil-item">
            <h2>Benutzername: <span>{userData.username}</span></h2>
          </div>
          <div className="profil-item">
            <h2>Alter: <span>{calculateAge(userData.age)}</span></h2>
          </div>
          <div className="profil-item">
            <h2>Körperzustand</h2>
            <div className='profil-desc'>
              <h2>Gewicht: <span>{userData.weight}</span> (kg)</h2>
              <h2>Größe: <span>{userData.height}</span> (cm)</h2>
            </div>
          </div>
        </div>
        <div className="abmelden-btn">
          <button className="btn" type="button" onClick={handleLogout}>Abmelden</button>
          <button className="btn" type="button" onClick={() => navigate('/menu')}>Komm zurück</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
