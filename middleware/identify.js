const userModel = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (socket,next) => {
    const token = socket.handshake.auth.token;
    //check if there is a token
    if(!token) return next(new Error("no token"));
    //verify token
    jwt.verify(token,config.get("secretKey"),function(err,decoded){
        if(err) return next(new Error("auth failed"));
        //parse id
        const id = decoded._id;
        //find user info from database
        userModel.findById(id,(err,doc) => {
            if(err) return next(err);
            //add user to socket object
            socket.user = {name:doc.name,id:doc.id};
            next()
        })

    })
}