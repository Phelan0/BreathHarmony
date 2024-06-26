import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login, getUser } from '../services/user'; // Đảm bảo đường dẫn này đúng
import { useColor } from '../ColorContext';
import '../styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const { changeBackgroundColor } = useColor();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
    weight: '',
    height: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, password, age, weight, height } = formData;

    // Kiểm tra các điều kiện hợp lệ
    if (weight < 1 || height < 1) {
      setError('Weight and Height must be greater than 0.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (age > today) {
      setError('Age cannot be a future date.');
      return;
    }

    try {
      await register(username, password, age, weight, height);
      const token = await login(username, password);
      localStorage.setItem('token', token); // Lưu token vào localStorage
      const userData = await getUser(); // Lấy thông tin người dùng từ backend sau khi đăng nhập
      const userBackgroundColor = userData.color || '#EDDCFF'; // Lấy màu nền của người dùng từ dữ liệu trả về
      changeBackgroundColor(userBackgroundColor); // Cập nhật màu nền cho người dùng
      navigate('/menu');
    } catch (error) {
      console.error(error);
      setError('An error occurred during registration.'); // Xử lý thông báo lỗi cho người dùng
    }
  };

  return (
    <div className="register-container">
      <div className="register-title">
        <h1>Deine Informationen</h1>
      </div>
      <form id="register-form" onSubmit={handleRegister}> 
        <div className="register-input">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="register-input">
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="register-desc">
          <div className="register-input register-age">
            <label htmlFor="age">Age</label>
            <input
              type="date"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="register-input">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="register-input">
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="register-btn">
          <button className="btn" type="submit">
            Register
          </button>
          <button className="btn" type="button" onClick={() => navigate('/')}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
