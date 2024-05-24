const express = require('express');
const mongoose =require("mongoose")
const bodyParser = require('body-parser');
const cors=require('cors');
const connectDB=require("./config/db")
connectDB()
const placeRoute=require('./Routes/MainRoute');
// const userRoute=require('./Routes/UserRoute')
const UserRoute=require('./Users/UserRoutes');
const app = express();
const PORT = 4001;
app.use(bodyParser.json());

// Route for the root endpoint
app.get('/', (req, res) => {
  res.send('Project - Endpoint!');
});
app.use(cors());

// Route for the /ping endpoint
app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});



app.use('/api', placeRoute);
// app.use('/user',userRoute);
app.use('/users',UserRoute);


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
})

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the server for testing
module.exports = server;