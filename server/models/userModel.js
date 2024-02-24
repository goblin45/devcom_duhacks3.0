const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    completedDetails:{
        type:Boolean,
        default:false,
    },
    username:{
        type:String,
        trim:true,
        unique:true,
        required:[true,"Username is required"]
    },
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        trim:true,
        required:[true,"Password is required"]
    },
    avatarIndex:{
        type:Number,
        min:[0,"Minimum value required 0"],
        max:[7,"Maximum value can be 7"],
        default:0
    },
    education:{
        type:String,
        trim:true,
    },
    profession:{
        type:String,
        trim:true,
    },
    country:{
        type:String,
        trim:true,
        default:"India"
    },
    state:{
        type:String,
        trim:true,
    },
    city:{
        type:String,
        trim:true
    },
    pin:{
        type:Number,
    },
    bio:{
        type:String,
        trim:true,
    },
    totalPostCount:{
        type:Number,
        default:0
    },
    createdPosts:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:'PostModel'
    },
    connections:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:'UserModel'
    }
},{timestamps:true});

// user registration 
userSchema.statics.register = async function({username,email,password}){
    // exists
    const emailExists = await this.findOne({email});
    const usernameExists = await this.findOne({username});
    if(emailExists){
        throw new Error("Email already exists");
    }
    if(usernameExists){
        throw new Error("Username already exists");
    }
    // validation 
    if(!validator.isEmail(email)){throw new Error("Email not valid");}
    if(!validator.isStrongPassword(password)){throw new Error("Password not strong enough");}
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({username,email,password:hash});
    if(!user){
        throw new Error("User registration failed");
    }
    return user;
}

// user login 
userSchema.statics.login = async function(username,password){
    // not exists
    const savedUser = await this.findOne({username});
    if(!savedUser){
        throw new Error("Email is not registered");
    }
    // verification
    const match = bcrypt.compare(savedUser.password,password);
    if(!match){
        throw new Error("Password is not correct");
    }
    return savedUser;
}


module.exports = mongoose.model('UserModel', userSchema);