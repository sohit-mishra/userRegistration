const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sercetKey = process.env.SERCET_KEY

const checkToken = (req, res, next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, sercetKey);
        req.User = decoded;
        next();
    } catch (error) {
        res.status(500).json({"message":error})
    }
}

module.exports = checkToken;