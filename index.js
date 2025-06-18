const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connection = require('./config/db');
dotenv.config();

const schoolRoutes = require('./routes/schoolRoutes');

app.use(express.json());
app.use('/', schoolRoutes);
app.get('/', (req, res) => {
  res.send('✅ School API is running!');
});
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));