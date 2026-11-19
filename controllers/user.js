const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

module.exports.registerUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).send({error: "Email and password are required"});
        }

        const existingUser = await User.findOne({email: email.toLowerCase()});
        if(existingUser){
            return res.status(409).send({error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).send({ message: "Register Successfully"});

    }catch(err){
        return res.status(500).send({ error: "Error registering user", details: err.message})
    }
};

module.exports.loginUser = async(req, res) => {
    try{
        const { email, password } =req.body;

        if(!email || !password){
            return res.status(400).send({ error: "Email and password are required"});
        }

        const user = await User.findOne({email: email.toLowerCase()});
        if(!user){
            return res.status(404).send({error: "No user found with this email"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).send({error: "Email and password do not match"});
        }

        const payload = {
            id: user._id,
            email: user.email,
            isAdmin: user.isadmin
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{});
        return res.status(200).send({access: token });

    }catch(err){
        return res.status(500).send({error: "Error logging in", details: err.message })
    }
};

module.exports.getUserDetails = async( req, res ) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        
        if(!user){
            return res.status(404).send({error: "User not found"});
        }
        return res.status(200).send({ user });

    }catch(err){
        return res.status(500).send({error: "Error retreiving user details", details: err.message});
    }
};