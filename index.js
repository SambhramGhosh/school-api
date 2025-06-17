const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const schoolRoutes = require('./routes/schoolRoutes');

app.use(express.json());
app.use('/', schoolRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));