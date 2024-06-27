import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api/breath', 
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token'), 
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  }
  return Promise.reject(error);
});

export default api;

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data.token;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (username, password, age, weight, height) => {
  try {
    const response = await api.post('/register', { username, password, age, weight, height });
    return response.data.token;
  } catch (error) {
    throw error.response.data;
  }
};

export const changePassword = async (newPassword) => {
  try {
    const token = localStorage.getItem('token'); 
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const response = await api.put('/changepassword', { newPassword }, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateAvatar = async (formData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'multipart/form-data'
    }
  };
  const response = await axios.put('/updateava', formData, config);
  return response.data;
};

export const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem('token'); 
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const response = await api.put('/updateuser', userData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const response = await api.get('/getuser', config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const updateStatistik = async (date, count, status) => {
  try {
    const token = localStorage.getItem('token'); 
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const response = await api.put('/updatestatistik', {
      date,
      count,
      status,
    }, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getStatistik = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const response = await axios.get('/getstatistik', config); 
    return response.data;
  } catch (error) {
    console.error('Error fetching statistik:', error);
    throw error.response.data; 
  }
};