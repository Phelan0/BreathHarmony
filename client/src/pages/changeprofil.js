import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/user'; 
import { useColor } from '../ColorContext';
import '../styles/changeprofil.css';

const Changeprofil = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();
  const [userData, setUserData] = useState({
    username: '',
    age: '',
    weight: '',
    height: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(); 
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const { age, weight, height } = userData;

    if (weight < 1 || height < 1) {
      setError('Weight and Height must be greater than 0.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (age > today) {
      setError('Age cannot be a future date.');
      return;
    }

    try {
      await updateUser(userData); 
      navigate('/menu');
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Failed to update user data.');
    }
  };

  return (
    <div style={{ backgroundColor }}>
      <div className="changeprofil-container">
        <div className="changeprofil-title">
          <h1>Profil ändern</h1>
        </div>
        <div className="changeprofil-content">
          <form id="changeprofil-form" onSubmit={handleUpdateSubmit}> 
            <div className="changeprofil-input">
              <label htmlFor="username">Benutzername</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className='changeprofil-input'>
                <label htmlFor="age">Alter</label>
                <input
                  type="date"
                  id="age"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]} 
                  required
                />
              </div>
            <div className='changeprofil-desc'>
              <div className="changeprofil-input">
                <label htmlFor="weight">Gewicht (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={userData.weight}
                  onChange={handleChange}
                  min="1" 
                  required
                />
              </div>
              <div className="changeprofil-input">
                <label htmlFor="height">Größe (cm)</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={userData.height}
                  onChange={handleChange}
                  min="1" 
                  required
                />
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="changeprofil-btn">
              <button className="btn" type="submit">Aktualisieren</button>
              <button className="btn" type="button" onClick={() => navigate('/einstellungen')}>Komm zurück</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Changeprofil;
