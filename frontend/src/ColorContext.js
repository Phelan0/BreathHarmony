import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('#EDDCFF'); 

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: {
              'x-auth-token': token
            }
          };
          const response = await axios.get('http://localhost:5000/api/breath/getuser', config);
          setBackgroundColor(response.data.color || '#EDDCFF');
        }
      } catch (error) {
        console.error('Error fetching user color:', error);
      }
    };

    fetchColor();
  }, []);

  const changeBackgroundColor = async (color) => {
    setBackgroundColor(color);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: {
            'x-auth-token': token
          }
        };
        await axios.put('http://localhost:5000/api/breath/updatecolor', { color }, config);
      }
    } catch (error) {
      console.error('Error updating background color:', error);
    }
  };

  return (
    <ColorContext.Provider value={{ backgroundColor, changeBackgroundColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
