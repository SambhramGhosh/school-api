const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connection = require('./config/db');
dotenv.config();

const schoolRoutes = require('./routes/schoolRoutes');

app.use(express.json());
app.use('/', schoolRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));