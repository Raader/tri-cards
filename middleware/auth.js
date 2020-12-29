//requirements
const jwt = require("jsonwebtoken");
const config = require("config");
const parseBearerToken = require('parse-bearer-token').default;

module.exports = function(req,res,next){
    const token = parseBearerToken(req);
    //check if request has a token
    if(!token) return res.status(400).json({msg:"no token found "});
    //verify token
    jwt.verify(token,config.get("secretKey"),function(err,decoded){
        if(err) return res.status(400).json({msg:"invalid token "});
        req.userId = decoded._id;
        next();
    })
}