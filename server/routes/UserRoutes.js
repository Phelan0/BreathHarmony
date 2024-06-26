const express = require('express');
const { register, login, changePassword, getUser, updateUser, updateColor, updateStatistik, getStatistik, getCount } = require('../controllers/UserController');
const auth = require('../middleware')
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.put('/changepassword', auth, changePassword);
router.get('/getuser', auth, getUser);
router.put('/updateuser', auth, updateUser);
router.put('/updatecolor', auth, updateColor);
router.put('/updatestatistik', auth, updateStatistik);
router.get('/getstatistik', auth, getStatistik);
router.get('/getcount', auth, getCount);
module.exports = router;
