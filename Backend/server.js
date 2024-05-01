const express = require('express');
const mongoose =require("mongoose")
const connectDB=require("./config/db")
connectDB()
const app = express();
const PORT = 4001;

// Route for the root endpoint
app.get('/', (req, res) => {
  res.send('ASAP Project - Endpoint!');
});

// Route for the /ping endpoint
app.get('/ping', (req, res) => {
  res.send('Pong!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});



mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
})

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the server for testing
module.exports = server;