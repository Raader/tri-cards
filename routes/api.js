//initialize router for the api routes
const router = require("express").Router();

//use routes
router.use("/users",require("./users"));
router.use("/profiles",require("./profiles"));
router.use("/game",require("./game"));
module.exports = router;