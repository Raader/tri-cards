const express = require("express")
const controller = require("../controllers/users");

//initialize router
const router = express.Router();

//handle requests

router.post("/login", function(req,res) {
    controller.login(req,res);
})

router.post("/register", function(req,res){
    controller.register(req,res);
})

router.get("/:id", function(req,res){
    res.send("userInfo");
})

module.exports = router;