const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sercetKey = process.env.SERCET_KEY

const tokenBlacklist = new Set();


const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ "message": 'Please provide name, email, and password' });
    }

    try {
        const UserExisting = await User.findOne({ email });

        if (UserExisting) {
            return res.json({ "message": "User Already Existing" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(200).json({ "message": 'Registration Successfully', user: { id: newUser._id, name, email } });
    } catch (error) {
        res.status(500).json({ "message": error })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(500).json({"message" :'Please provide email, and password'})
    }

    try {
        const UserExisting = await User.findOne({email});

        if(!UserExisting){
            return res.status(500).json({"message" : "Please Go and Signup now!"})
        }

        const matchedPassword = await bcrypt.compare(password,UserExisting.password);

        if (!matchedPassword){
            return res.status(500).json({"message": "Password is incorrect!"});
        }

        const accessToken = jwt.sign({id : UserExisting._id, name: UserExisting.name , email: UserExisting.email}, sercetKey ,{ expiresIn: '15m' });
        const refreshToken = jwt.sign({id : UserExisting._id, name: UserExisting.name , email: UserExisting.email}, sercetKey, {expiresIn: '7d'});

        res.status(200).json({"message" : "Sucessfully Login ", accessToken, refreshToken})
    } catch (error) {
        res.status(500).json({"message":error});
    }
}


const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ "message": 'Refresh token is required' });
    }

    const token = authHeader.split(' ')[1];

    if(token){
        tokenBlacklist.add(token);
    }
    res.status(200).json({ "message": 'LogOut Successfully' });
}


const refreshToken = async (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ "message": 'Refresh token is required' });
    }

    const token = authHeader.split(' ')[1];
    if(token){
        tokenBlacklist.add(token);
    }
    try {
        const decoded = jwt.verify(token,sercetKey);
        console.log(decoded);
        const newAcessToken = jwt.sign({id : decoded.id, name: decoded.name , email: decoded.email},sercetKey,{expiresIn:'15m'});
        res.status(200).send({accessToken : newAcessToken});
    } catch (error) {
        res.status(500).json({"message" :error});
    }
}

module.exports = { signup, login, logout, refreshToken };