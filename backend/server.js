const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use('/projects', projectRoutes);

const blogRoutes = require('./routes/blogRoutes');
app.use('/blogs', blogRoutes);

const serviceRoutes = require('./routes/serviceRoutes');
app.use('/services', serviceRoutes);

const testimonialRoutes = require('./routes/testimonialRoutes');
app.use('/testimonials', testimonialRoutes);

const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contacts', contactRoutes);

app.use('/uploads', express.static('uploads')); // serve uploaded files

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
