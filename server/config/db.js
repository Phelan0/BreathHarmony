const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/BreathHarmony', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true // Thêm tùy chọn này để tránh cảnh báo deprecation
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
