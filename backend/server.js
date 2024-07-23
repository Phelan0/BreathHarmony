const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middleware');

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors()); 

const userRoutes = require('./routes/UserRoutes');
app.use('/api/breath', userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
