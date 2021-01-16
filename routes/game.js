const express = require("express");
const controller = require("../controllers/game");

//init router
const router = express.Router();
router.get("/cards",function(req,res){
    controller.getAllCards(req,res);
})
module.exports = router;
