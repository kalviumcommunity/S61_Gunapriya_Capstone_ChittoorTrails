const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const placeRoute = require('./Routes/MainRoute');
const UserRoute = require('./Users/UserRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4001;
app.use(cookieParser());
connectDB();

app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('Project - Endpoint!');
});

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.use('/api', placeRoute);
app.use('/users', UserRoute);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB. ');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
