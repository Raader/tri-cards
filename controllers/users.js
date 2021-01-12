const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = require("config").get("secretKey");

function register(req, res){
    //parse user from request body
    const user = req.body.user;
    //check if it has all the fields needed
    if(!user||!user.name||!user.email||!user.password) return res.status(400).json({msg:"user object is not valid"});
    //check if the user exist
    userModel.exists({name:user.name})
    .then((val) => {
        if(val){
            res.status(400).json({msg:"user already exists"})
            throw new Error("user already exists");
        }
        //hash password
        return bcrypt.hash(user.password,10)
    })
    .then((hash) => {
        user.password = hash;
        //create document and save
        console.log(user);
        const userDoc = new userModel({name:user.name,email:user.email,password:user.password});
        return userDoc.save()
    })
    .then((doc) => {
        //create token send it to the client
        const token = jwt.sign({_id:doc.id},secretKey,{expiresIn:"360h"});
        res.json({msg:"succesfully registered user",token,user:{_id:doc.id,name:doc.name,email:doc.email,cake:doc.cake}});
    })
    .catch(err => {
        console.error(err);
    })
}

function login(req, res){
    //parse user from request body
    const user = req.body.user;
    //check if it has all the fields needed
    if(!user||!user.email||!user.password) return res.status(400).json({msg:"user object is not valid"});
    //check if the user exists
    userModel.findOne({email:user.email}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({msg:"user not found"});
            throw new Error("user not found")
        }
        user.name = doc.name;
        user.id = doc.id;
        //compare passwords
        return bcrypt.compare(user.password, doc.password)
    })
    .then(val => {
        if(!val){
            res.status(400).json({msg:"invalid password"});
            throw new Error("invalid password")
        }
        //generate token send it to the client
        const token = jwt.sign({_id:user.id},secretKey,{expiresIn:"360h"});
        res.json({msg:"succesfully logged in user",token,user:{_id:user.id,name:user.name,email:user.email,cake:user.cake}});
    })
    .catch(err => {
        console.error(err);
    })
}

function get(req,res){
    //parse user id from request
    const id = req.userId
    userModel.findById(id).exec()
    .then((doc) => {
        if(!doc){
            res.status(400).json({msg:"user not found"});
            throw new Error("user not found")
        }
        res.json({user:{name:doc.name, email:doc.email, cake:doc.cake, _id:doc.id}});
    })
    .catch(err => {
        console.error(err);
    })
}



module.exports.register = register;
module.exports.login = login;
module.exports.get = get;