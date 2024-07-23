import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login, getUser } from '../services/user'; 
import { useColor } from '../ColorContext';
import '../styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const { changeBackgroundColor } = useColor();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
    weight: '',
    height: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, password, age, weight, height } = formData;

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
      await register(username, password, age, weight, height);
      const token = await login(username, password);
      localStorage.setItem('token', token); 
      const userData = await getUser(); 
      const userBackgroundColor = userData.color || '#EDDCFF'; 
      changeBackgroundColor(userBackgroundColor); 
      navigate('/menu');
    } catch (error) {
      console.error(error);
      setError('An error occurred during registration.'); 
    }
  };

  return (
    <div className="register-container">
      <div className="register-title">
        <h1>Deine Informationen</h1>
      </div>
      <form id="register-form" onSubmit={handleRegister}> 
        <div className="register-input">
          <label htmlFor="username">Benutzername</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="register-input">
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="register-input">
            <label htmlFor="age">Alter</label>
            <input
              type="date"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        <div className="register-desc">
          <div className="register-input">
            <label htmlFor="weight">Gewicht (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="register-input">
            <label htmlFor="height">Größe (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="register-btn">
          <button className="btn" type="submit">
          Registrieren
          </button>
          <button className="btn" type="button" onClick={() => navigate('/')}>
          Zurück zur Anmeldung
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
