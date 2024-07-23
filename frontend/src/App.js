import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ColorProvider } from './ColorContext';
import Login from './pages/login';
import Register from './pages/register';
import Menu from './pages/menu';
import Atemubung from './pages/atemubung';
import Statistik from './pages/statistik';
import Profil from './pages/profil';
import Einstellungen from './pages/einstellungen';
import Uber from './pages/uber';
import Kontakt from './pages/kontakt';
import Loading from './components/loading';
import Edit from './pages/editcolor';
import Changepass from './pages/changepass';
import Changeprofil from './pages/changeprofil';
import Schlaf from './pages/schlaf';
import Menu2 from './pages/menu2';
import Lungen from './pages/lungen';
import Herz from './pages/herz';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer); 
  }, []);

  return (
        <Router>
          {isLoading ? (
            <Loading />
          ) : (
            <ColorProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            <Route path="/menu" element={<Menu />} />
            <Route path='/atemubung' element={<Atemubung />} />
            <Route path='/statistik' element={<Statistik />} />
            <Route path='/profil' element={<Profil />} />
            <Route path='/einstellungen' element={<Einstellungen />} />
            <Route path='/uber' element={<Uber />} />
            <Route path='/kontakt' element={<Kontakt />} />
            <Route path='/color' element={<Edit />} />
            <Route path='/changepass' element={<Changepass />} />
            <Route path='/changeprofil' element={<Changeprofil />} />
            <Route path='/menu2' element={<Menu2 />} />
            <Route path='/schlaf' element={<Schlaf />} />
            <Route path='/lungen' element={<Lungen />} />
            <Route path='/herz' element={<Herz />} />
          
            </Routes>
            </ColorProvider>
          )}
        </Router>
  );
}

export default App;
