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
            <h1>Uber uns</h1>
        </div>
        <div className="uber-content">
            <div className="uber-list">
                <div className="uber-item">
                    <h3>TTTTTTTTTTTT TTTTTTTTTTTTT TTTTT</h3>
                    <p>ttttttttt tttttttt tttt ttttttttt ttttt ttt</p>
                    <p className="line">...............................................................</p>
                </div>
                <div className="uber-item">
                    <h3>TTTTTTTTTTTT TTTTTTTTTTTTT TTTTT</h3>
                    <p>ttttttttt tttttttt tttt ttttttttt ttttt ttt</p>
                    <p className="line">...............................................................</p>
                </div>
                <div className="uber-item">
                    <h3>TTTTTTTTTTTT TTTTTTTTTTTTT TTTTT</h3>
                    <p>ttttttttt tttttttt tttt ttttttttt ttttt ttt</p>
                    <p className="line">...............................................................</p>
                </div>
                <div className="uber-item">
                    <h3>TTTTTTTTTTTT TTTTTTTTTTTTT TTTTT</h3>
                    <p>ttttttttt tttttttt tttt ttttttttt ttttt ttt</p>
                    <p className="line">...............................................................</p>
                </div>
            </div>
        </div>
        <div className="uber-btn">
            <button className="btn" type="submit" onClick={() => navigate('/menu')}>Komm zuruck</button>
        </div>
    </div>
  );
}

export default Uber;