const express = require("express")
const controller = require("../controllers/profiles");
const auth =  require("../middleware/auth");

//initialize router
const router = express.Router();

//handle requests
router.post("/edit",auth,function(req,res){
    controller.edit(req,res);
})

router.get("/:id",function(req, res) {
    controller.getProfile(req,res);
})

module.exports = router;