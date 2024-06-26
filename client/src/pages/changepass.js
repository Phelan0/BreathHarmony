import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../services/user'; // Đảm bảo đường dẫn này đúng
import { useColor } from '../ColorContext';
import '../styles/changepass.css';

const Changepass = () => {
  const navigate = useNavigate();
  const { backgroundColor } = useColor();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangepassSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    try {
      await changePassword(newPassword); // Gọi API để đổi mật khẩu
      navigate('/');  // Chuyển hướng sau khi cập nhật mật khẩu thành công
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to update password'); // Xử lý lỗi và hiển thị thông báo cho người dùng
    }
  };

  const handleChangepassClick = () => {
    navigate('/menu');  // Chuyển hướng quay lại trang menu
  };

  return (
    <div style={{ backgroundColor }}>
      <div className="changepass-container">
        <div className="changepass-title">
          <h1>Change Password</h1>
        </div>
        <div className="changepass-content">
          <form id="changepass-form" onSubmit={handleChangepassSubmit}>
            <div className="changepass-input">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="changepass-btn">
              <button className="btn" type="submit">Update</button>
              <button className="btn" type="button" onClick={handleChangepassClick}>Back to Menu</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Changepass;
