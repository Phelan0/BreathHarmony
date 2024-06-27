import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useColor } from '../ColorContext';
import '../styles/kontakt.css'

const Kontakt = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();

  return (
    <div  style={{ backgroundColor }}>
        <div className="kontakt-container" >
            <div className="kontakt-title">
                <h1>Kontakt</h1>
            </div>
            <div className="kontakt-content">
            <div className="kontakt-list"  style={{textAlign: 'center'}}>
                <div className="kontakt-item">
                    <h3>Haben Sie noch Fragen oder benötigen Sie Unterstützung? </h3>
                    <h3>Dann kontaktieren Sie uns per E-Mail oder rufen Sie uns während der Öffnungszeiten
                    an. </h3>
                </div>
                <div className="kontakt-item">
                    <h3>Kontaktinformationen: </h3>
                    <h3>Telefonnummer: +49123637368368 </h3>
                    <h3>E-mail: <br/>breathharmony@unternehmen.com </h3>
                    <h3>Öffnungszeiten: <br/>Mo-Fr 9:00-18:00 Uhr </h3>
                    <h3>Social Media: @breathharmony auf Facebook, Instagram & Twitter </h3>
                </div>
            </div>
            </div>
            <div className="kontakt-btn">
                <button className="btn" type="submit" onClick={() => navigate('/menu')}>Komm zurück</button>
            </div>
        </div>
    </div>
  );
}

export default Kontakt;