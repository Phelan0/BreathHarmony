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
            <div className="uber-list" style={{textAlign: 'center'}}>
                <div className="uber-item"  >
                    <h3>Lerne mehr über BreathHarmony</h3>
                    <h4>Unser Unternehmen bietet eine Atemübung zur Stressbewältigung.</h4>
                    <p className="line">..............................................................................................</p>
                </div>
                <div className="uber-item">
                    <h3>Mission und Vision</h3>
                    <h4>Unsere Mission ist es, Menschen zu helfen, Stress durch eine effektive Atemübung zu reduzieren. 
                    Wir streben danach, die weltweit führende Plattform für Stressbewältigung durch eine Atemübung zu sein. </h4>
                    <p className="line">..............................................................................................</p>
                </div>
                <div className="uber-item">
                    <h3>Unser Team</h3>
                    <h4>Phuong Le</h4>
                    <h4>Olga Mujinga</h4>
                    <h4>Louisa von Rüden</h4>
                    <h4>Anna Kouame</h4>
                    <h4>Gloria Omane Kyerewaah</h4>
                    <p className="line">..............................................................................................</p>
                </div>
                <div className="uber-item">
                    <h3>Unsere Geschichte </h3>
                    <h4>Gründung: 2024</h4>
                </div>
            </div>
        </div>
        <div className="uber-btn">
            <button className="btn" type="submit" onClick={() => navigate('/menu')}>Zurück</button>
        </div>
    </div>
  );
}

export default Uber;