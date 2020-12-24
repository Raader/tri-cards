const express = require("express")
const router = express.Router();

router.post("/login", function(req,res) {
    res.send("login");
})

router.post("/register", function(req,res){
    res.send("register");
})

router.get("/:id", function(req,res){
    res.send("userInfo");
})

module.exports = router;