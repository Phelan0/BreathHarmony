import React from 'react';

import { useColor } from '../ColorContext';
import '../styles/loading.css'


const Loading = () => {
  const { backgroundColor } = useColor();
  return (
    <div className="loading-screen">
    <div className="loading-text">
        <h2>BreathHarmony</h2>
    </div>
    <div>
        
    </div>
    <h5>Find your breath, Find your Peace</h5>
</div>
  );
}

export default Loading;