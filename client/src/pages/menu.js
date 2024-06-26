import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useColor } from '../ColorContext';
import '../styles/menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLungs } from '@fortawesome/free-solid-svg-icons';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();

  return (
    <div className="menu-container"  style={{ backgroundColor }}>
        <div className="menu-title">
            <h2>Menu</h2>
        </div>
        <div className="menu-list">
            <div className="item" onClick={() => navigate('/atemubung')}>
                <FontAwesomeIcon icon={faLungs} className='icon'/> Atemubngen
            </div>
            <div className="item" onClick={() => navigate('/statistik')}>
                <FontAwesomeIcon icon={faChartColumn} className='icon'/> Statistik
            </div>
            <div className="item" onClick={() => navigate('/profil')}>
                <FontAwesomeIcon icon={faUser} className='icon'/> Profil
            </div>
            <div className="item" onClick={() => navigate('/einstellungen')}>
                <FontAwesomeIcon icon={faGear} className='icon'/> Einstellungen
            </div>
            <div className="item" onClick={() => navigate('/uber')}>
                <FontAwesomeIcon icon={faCircleExclamation} className='icon'/> Uber uns
            </div>
            <div className="item" onClick={() => navigate('/kontakt')}>
                <FontAwesomeIcon icon={faAddressBook} className='icon'/> Kontakt
            </div>
        </div>
    </div>
  );
}

export default Menu;