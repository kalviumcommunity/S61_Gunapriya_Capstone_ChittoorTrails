const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const placeRoute = require('./Routes/MainRoute');
const UserRoute = require('./Users/UserRoutes');

const app = express();
const PORT = 4001;

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Apply CORS middleware globally
app.use(cors());

// Middleware to log request bodies
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

// Define routes
app.get('/', (req, res) => {
  res.send('Project - Endpoint!');
});

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.use('/api', placeRoute);
app.use('/users', UserRoute);

// Start the server once connected to the database
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Export the server for testing
module.exports = app;
