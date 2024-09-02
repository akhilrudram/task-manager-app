const express = require('express');
const router = express.Router();

router.use('/', require('./userRoutes'));

router.use('/', require('./taskRoutes'));

module.exports = router;
