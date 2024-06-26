import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';

const getLast7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toLocaleDateString('en-GB'));
    }
    return days;
};

const fillMissingData = (statistikData) => {
    const last7Days = getLast7Days();
    const filledData = last7Days.map(date => {
        const entry = statistikData.find(data => new Date(data.date).toLocaleDateString('en-GB') === date);
        if (entry) {
            return {
                date: date,
                count: entry.count,
                status: entry.status
            };
        } else {
            return {
                date: date,
                count: 0,
                status: 'no selection'
            };
        }
    });
    return filledData;
};

const Dashboard = () => {
    const navigate = useNavigate();
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [statistikData, setStatistikData] = useState([]);

    useEffect(() => {
        const fetchStatistikData = async () => {
            try {
                const token = localStorage.getItem('token'); // Lấy token từ localStorage
                if (!token) {
                    navigate('/login'); // Chuyển hướng đến trang đăng nhập nếu không có token
                    return;
                }

                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const response = await axios.get('http://localhost:5000/api/breath/getstatistik', config); // Gọi API để lấy dữ liệu statistik từ backend
                if (Array.isArray(response.data)) {
                    const filledData = fillMissingData(response.data);
                    setStatistikData(filledData); // Lưu dữ liệu vào state nếu nó là mảng
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching statistik:', error);
                // Xử lý lỗi tại đây (hiển thị thông báo lỗi hoặc thực hiện hành động phù hợp)
            }
        };

        fetchStatistikData();
    }, [navigate]);

    useEffect(() => {
        if (statistikData.length === 0) return;

        // Lấy labels và data từ statistikData và định dạng lại ngày
        const labels = statistikData.map(entry => entry.date);
        const data = statistikData.map(entry => entry.count);

        const ctx = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Số lần',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                responsive: true,
            },
            plugins: [{
                id: 'emojiPlugin',
                afterDatasetsDraw: (chart, args, options) => {
                    const { ctx, data } = chart;
                    ctx.save();
                    const emojiMap = {
                        'gut': '🙂',
                        'normal': '😑',
                        'schlecht': '☹️',
                        'no selection': ''
                    };

                    data.datasets[0].data.forEach((value, index) => {
                        const status = statistikData[index].status;
                        if (emojiMap[status]) {
                            const x = chart.getDatasetMeta(0).data[index].x;
                            const y = chart.getDatasetMeta(0).data[index].y;
                            ctx.fillText(emojiMap[status], x-10, y -15);
                        }
                    });

                    ctx.restore();
                }
            }]
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [statistikData]);

    return (
        <div id="chart-container">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default Dashboard;
