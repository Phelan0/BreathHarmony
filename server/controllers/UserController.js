const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'your_jwt_secret_key'; 

exports.register = async (req, res) => {
    const { username, password, age, weight, height } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            password,
            age,
            weight,
            height
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, secret, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.changePassword = async (req, res) => {
    const { newPassword } = req.body;

    try {
        const userId = req.user.id;
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId).select('-password'); 

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateUser = async (req, res) => {
    const { username, age, weight, height } = req.body;
  
    try {
      const userId = req.user.id; 
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      user.username = username || user.username;
      user.age = age || user.age;
      user.weight = weight || user.weight;
      user.height = height || user.height;
  
      await user.save();
      res.status(200).json({ msg: 'User updated successfully', user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};


exports.updateColor = async (req, res) => {
    const {color} = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.color = color;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


exports.updateStatistik = async (req, res) => {
    const { date, count, status } = req.body;
    
    try {
      const userId = req.user.id;
  
      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      const existingStatistik = user.statistik.find(stat => stat.date.toDateString() === new Date(date).toDateString());
  
      if (existingStatistik) {
        existingStatistik.count += count;
        existingStatistik.status = status;
      } else {
        user.statistik.push({
          date: new Date(date),
          count: 1, 
          status
        });
      }
  
      user = await user.save();
  
      return res.status(200).json(user); 
    } catch (error) {
      console.error('Error updating statistik:', error);
      return res.status(500).json({ message: 'Server error' });
    }
};

exports.getStatistik = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json(user.statistik);
    } catch (error) {
      console.error('Error fetching statistik:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

exports.getCount = async (req, res) => {
      try {
        const userId = req.user.id; 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ count: user.statistik.count }); 
        console.log({ count: user.statistik.count })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
  



