//requirements
const userModel = require("../models/User");

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
        res.json({msg:"edited color",color:doc.avatar_color,name:doc.name})
    })
    .catch(err => {
        console.error(err);
    })

}

module.exports.editColor = editColor;