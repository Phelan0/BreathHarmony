import React from 'react';

import '../styles/loading.css'
import logo from '../asset/images/logo.png'

const Loading = () => {
  return (
    <div className="loading-screen">
        <img src={logo}/>
    </div>
  );
}

export default Loading;