const { route } = require("./users");

//initialize router for the api routes
const router = require("express").Router();

//use routes
router.use("/users",require("./users"));
router.use("/profiles",require("./profiles"));
module.exports = router;