import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getUser } from '../services/user'; // Đảm bảo đường dẫn này đúng
import { useColor } from '../ColorContext';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { changeBackgroundColor } = useColor();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    try {
      const token = await login(username, password); // Lấy token từ dịch vụ login
      localStorage.setItem('token', token); // Lưu token vào localStorage
      const userData = await getUser(); // Lấy thông tin người dùng từ backend sau khi đăng nhập
      const userBackgroundColor = userData.color || '#EDDCFF'; // Lấy màu nền của người dùng từ dữ liệu trả về
      changeBackgroundColor(userBackgroundColor); // Cập nhật màu nền cho người dùng
      navigate('/menu');
    } catch (error) {
      setError('Invalid credentials');
      console.error(error);
      // Xử lý thông báo lỗi cho người dùng
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <h1>Willkommen! <br/> Melde dich bei BreathHarmony an!</h1>
      </div>
      <form id="login-form" onSubmit={handleLoginSubmit}> 
        <div className="login-input">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="login-btn">
          <button className="btn" type="submit">Login</button>
          <button className="btn" type="button" onClick={handleRegisterClick}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
