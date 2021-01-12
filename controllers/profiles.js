//requirements
const userModel = require("../models/User");

function getProfile(req,res){
    //parse user id from request params
    const id = req.params.id;
    //check id validity
    if(!id) return res.status(400);
    userModel.findById(id).exec()
    .then((doc) => {
        if(!doc){
            res.status(400).json({msg:"user not found"});
            throw new Error("user not found")
        }
        res.json({user:{name:doc.name, cake:doc.cake, _id:doc.id, avatar_color:doc.avatar_color,status_msg:doc.status_msg}});
    })
    .catch(err => {
        console.error(err);
    })
}

function editColor(req,res){
    //parse color from request 
    const color = req.body.color;
    if(!color) return res.status(400).json({msg:"no color found"});
    //parse user id from request
    const id = req.userId;
    //find user in the database
    userModel.findByIdAndUpdate(id,{avatar_color:color},{useFindAndModify:false,new:true}).exec()
    .then(doc => {
        if(!doc) {
            res.status(400).json({msg:"user not found"});
            throw new Error("user not found");
        }
        res.json({msg:"edited color",color:doc.avatar_color,user:{name:doc.name,_id:doc.id}})
    })
    .catch(err => {
        console.error(err);
    })
}

function editStatus(req,res){
    //parse status message from request 
    const status = req.body.status;
    if(!status) return res.status(400).json({msg:"no status found"});
    //parse user id from request
    const id = req.userId;
    //find user in the database
    userModel.findByIdAndUpdate(id,{status_msg:status},{useFindAndModify:false,new:true}).exec()
    .then(doc => {
        if(!doc) {
            res.status(400).json({msg:"user not found"});
            throw new Error("user not found");
        }
        res.json({msg:"edited status",status:doc.status_msg,user:{name:doc.name,_id:doc.id}})
    })
    .catch(err => {
        console.error(err);
    })
}


module.exports.editColor = editColor;
module.exports.getProfile = getProfile;
module.exports.editStatus = editStatus;