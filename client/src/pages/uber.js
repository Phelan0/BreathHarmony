import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useColor } from '../ColorContext';
import '../styles/uber.css'

const Uber = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();

  return (
    <div className="uber-container"  style={{ backgroundColor }}>
        <div className="uber-title">
            <h1>Über uns</h1>
        </div>
        <div className="uber-content">
            <div className="uber-list">
                <div className="uber-item">
                    <h3>Lerne mehr über Breath Harmony 
                    Unser Unternehmen bietet Atemübungen zur Stressbewältigung.</h3>
                    <p className="line">..............................................................................................</p>
                </div>
                <div className="uber-item">
                    <h3>Mission und Vision 
                    Unsere Mission ist es, Menschen zu helfen, Stress durch effektive Atemübungen zu reduzieren. 
                    Wir streben danach, die weltweit führende Plattform für Stressbewältigung durch Atemübungen zu sein. </h3>
                    <p className="line">..............................................................................................</p>
                </div>
                <div className="uber-item">
                    <h3>Unser Team Olga Mujinga Louisa von Rüden: </h3>
                    <h4>Anna Kouame</h4>
                    <h4>Gloria Omane</h4>
                    <h4>Kyerewaah</h4>
                    <h4>Phuong Le</h4>
                    <p className="line">..............................................................................................</p>
                </div>
                <div className="uber-item">
                    <h3>Unsere Geschichte </h3>
                    <h4>Gründung: 2024</h4>
                </div>
            </div>
        </div>
        <div className="uber-btn">
            <button className="btn" type="submit" onClick={() => navigate('/menu')}>Komm zurück</button>
        </div>
    </div>
  );
}

export default Uber;