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

}

function get(req,res){

}

module.exports.register = register;
module.exports.login = login;
module.exports.get = get;