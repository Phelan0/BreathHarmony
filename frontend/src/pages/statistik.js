import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useColor } from '../ColorContext';
import '../styles/statistik.css'
import Dashboard from '../components/dashboard';

const Statistik = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();

  return (
    <div  style={{ backgroundColor }}>
        <div className="statistik-container">
            <div className="statistik-title">
                <h1>Statistik</h1>
                <p>Statistik in den letzten 7 Tagen</p>
            </div>
            <div className="statistik-content">
                <Dashboard />
            </div> 
            <div className="statistik-btn">
                <button className="btn" type="submit" onClick={() => navigate('/menu')}>Zurück</button>
            </div>
        </div>
    </div>
  );
}

export default Statistik;