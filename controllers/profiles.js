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

const editables = ["avatar_color","status_msg"]

function edit(req,res){
    const edit = req.body.edit;
    if(!edit) return res.status(400).json({msg:"no change found"})
    for(let key of Object.keys(edit)){
        if(!editables.find((val) => val.localeCompare(key) === 0)){
            return res.status(400).json({msg:"tried to edit a noneditable property"})
        }
    }
    //parse user id from request
    const id = req.userId;
    userModel.findByIdAndUpdate(id,edit,{useFindAndModify:false,new:true}).exec()
    .then(doc => {
        if(!doc) {
            res.status(400).json({msg:"user not found"});
            throw new Error("user not found");
        }
        res.json({msg:"edited user",user:{name:doc.name,_id:doc.id}})
    })
    .catch(err => {
        console.error(err);
    })
}

module.exports.getProfile = getProfile;
module.exports.edit = edit;