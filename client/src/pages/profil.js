import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {updateAvatar } from '../services/user'; 

import ava from '../asset/images/avatar.jpg'

import { useColor } from '../ColorContext';
import '../styles/profil.css';

const Profile = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(ava);
  const { backgroundColor } = useColor();
  const [userData, setUserData] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'multipart/form-data',
          },
        };

        const response = await updateAvatar(formData, config )
        setAvatar(response.data.avatarPath); // Cập nhật avatar với đường dẫn mới từ server
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (!token) {
          navigate('/'); // Chuyển hướng đến trang đăng nhập nếu không có token
          return;
        }

        const config = {
          headers: {
            'x-auth-token': token
          }
        };
        const response = await axios.get('http://localhost:5000/api/breath/getuser', config);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Xử lý lỗi khi không thể lấy dữ liệu người dùng
      }
    };

    fetchUserData();
  }, [navigate]); // Chỉ gọi một lần khi component mount

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    navigate('/'); // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Kiểm tra nếu ngày sinh chưa tới trong năm nay thì trừ 1 tuổi
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  if (!userData) {
    return <div>Loading...</div>; // Hiển thị loading khi đang lấy dữ liệu
  }

  return (
    <div style={{ backgroundColor }}>
      <div className="profil-container">
        <div className="profil-title">
          <h1>Mein Profil</h1>
        </div>
        <div className="profil-ava">
            <div className='profil-ava-img'>
                  <img src={avatar} alt="Avatar Preview" />
            </div>
            <form>
                  <div>
                  <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="avatar" style={{
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '5px 20px',
            borderRadius: '5px',
            display: 'inline-block',
            textAlign: 'center'
          }}>
            Choose File
          </label>
                  </div>
            </form>
        </div>
        <div className="profil-list">
          <div className="profil-item">
            <h2>Benutzername: <span>{userData.username}</span></h2>
          </div>
          <div className="profil-item">
            <h2>Age: <span>{calculateAge(userData.age)}</span></h2>
          </div>
          <div className="profil-item">
            <h2>Körperzustand</h2>
            <div className='profil-desc'>
              <h2>Weight: <span>{userData.weight}</span> (kg)</h2>
              <h2>Height: <span>{userData.height}</span> (cm)</h2>
            </div>
          </div>
        </div>
        <div className="abmelden-btn">
          <button className="btn" type="button" onClick={handleLogout}>Logout</button>
          <button className="btn" type="button" onClick={() => navigate('/menu')}>Komm zurück</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;