const express = require('express');
const serverless = require('serverless-http');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Routers
const unsplashRouter = require('./unsplash')

// Middleware
app.use(cors());
express.json();

app.get('/', (req, res) => {
  res.send('Welcome to the homepage for the Photix server.')
});

app.use('/unsplash', unsplashRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
