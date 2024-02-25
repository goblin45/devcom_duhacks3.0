const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const verifyToken = async(req,res,next)=>{
    try {
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({message:"You are not authenticated"});
        }
        const token = authorization.split(' ')[1];
        if(!token) return res.status(401).json({message:"Token invalid"});
        const {payload} = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await UserModel.findOne({payload}).select('_id'); // attach _id to req obj
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message:error?.message});
    }
}

module.exports = verifyToken;