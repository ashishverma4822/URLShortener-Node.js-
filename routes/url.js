const express = require('express');
const {handleGenrateNewShorURL, handleGetAnalytics} = require('../controlllers/url');

const router = express.Router();

router.post('/', handleGenrateNewShorURL);

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router; 