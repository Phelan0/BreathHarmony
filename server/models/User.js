
const mongoose = require('mongoose');

const StatistikSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  count: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['gut', 'normal', 'schlecht', 'no selection']
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  age: {
    type: Date
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  color: {
    type: String
  },
  statistik: [StatistikSchema] 
});

module.exports = mongoose.model('User', UserSchema);
