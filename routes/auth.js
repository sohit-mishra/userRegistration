const express = require('express');
const {signup , login , logout , refreshToken} = require('../controllers/authController');
const checkToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/signup',signup);
router.post('/refreshToken', refreshToken);


router.post('/logout',checkToken, logout);
module.exports = router;




