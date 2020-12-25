//initialize router for the api routes
const router = require("express").Router();

//use routes
router.use("/users",require("./users"));

module.exports = router;