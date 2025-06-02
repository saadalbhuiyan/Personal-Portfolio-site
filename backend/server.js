const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/admin', require('./routes/adminRoutes'));
app.use('/projects', require('./routes/projectRoutes'));
app.use('/blogs', require('./routes/blogRoutes'));
app.use('/services', require('./routes/serviceRoutes'));
app.use('/testimonials', require('./routes/testimonialRoutes'));
app.use('/contacts', require('./routes/contactRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
