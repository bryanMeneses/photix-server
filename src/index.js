const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Routers
const router = express.Router();
const unsplashRouter = require('./unsplash')

// Middleware
app.use(cors());
express.json();

router.get('/', (req, res) => {
  res.send('Welcome to the homepage for the Photix server.')
});

app.use('/.netlify/functions/index', router);
app.use('/.netlify/functions/index/unsplash', unsplashRouter);

module.exports = app;
module.exports.handler = serverless(app);
