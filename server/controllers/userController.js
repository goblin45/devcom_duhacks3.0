const UserModel = require('../models/userModel');
const mongoose = require('mongoose');

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, { username: 1, name: 1, email: 1, totalPostCount: 1, createdAt: 1, createdPosts: 1, connections:1 });
        if (!users) {
            return res.status(404).json({ message: "Could not fetch users", result: null });
        }
        res.status(200).json({ message: "Fetched users", result: users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// get user by id
const getUserById = async(req,res)=>{
    try {
        const {userId} = await req.body; // id of the person to be viewed
        const {id:_id} = await req.params; // id of the person wanting to view
        if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(_id)){
            return res.status(422).json({message:"Id is invalid"});
        }
        // const profile = await UserModel.findById({_id},{username:1,name:1,email:1,totalPostCount:1,createdAt:1,createdPosts:1});
        const userExist = await UserModel.exists({_id});
        if(!userExist){
            return res.status(404).json({message:"User not found"});
        }
        const user = await UserModel.findById(_id,{username:1,name:1,email:1,totalPostCount:1,createdAt:1,createdPosts:1});
        if(!user) throw new Error("Failed to fetch user");
        // success
        res.status(200).json({message:"Fetched user",result:user});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error?.message});
    }
}

// edit user profile
const updateUser = async(req,res)=>{
    try {
        const {id:_id} = await req.params;
        const userExist = await UserModel.exists({_id});
        if(!userExist){
            return res.status(404).json({message:"User doesn't exist"});
        }
        const updatedUser = await UserModel.findByIdAndUpdate(_id,{...req.body,completedDetails:true},{new:true},{username:1,name:1,email:1,totalPostCount:1,createdAt:1,createdPosts:1});
        if(!updatedUser){
            throw new Error("Could not update user");
        }
        res.status(200).json({message:"Updated successfully",result:updatedUser});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error?.message});
    }
}

// delete user
const deleteUser = async(req,res)=>{
    try {
        const {id:_id} = await req.body;
        const userExist = await UserModel.exists({_id:_id});
        if(!userExist){
            return res.status(404).json({message:"User doesn't exist"});
        }
        await UserModel.findByIdAndDelete(_id);
        res.status(200).json({message:"Profile deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error?.message});
    }
}

module.exports = {getUsers,getUserById,updateUser,deleteUser};