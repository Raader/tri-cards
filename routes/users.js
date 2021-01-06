const express = require("express")
const controller = require("../controllers/users");
const auth =  require("../middleware/auth");

//initialize router
const router = express.Router();

//handle requests

router.post("/login", function(req,res) {
    controller.login(req,res);
})

router.post("/register", function(req,res){
    controller.register(req,res);
})

router.get("/",auth, function(req,res){
    controller.get(req,res);
})

router.get("/:id",function(req,res){
    controller.getById(req,res);
})
module.exports = router;