const express = require('express');
const router = express.Router();

const home = require('./controller');

router.get('/', home.getHomePage);

module.exports = router;
