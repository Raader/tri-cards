const Card = require("./Card");

module.exports = {
    warrior: new Card("warrior",10,20,5,"/static/portraits/warrior.png"),
    mage: new Card("mage",30,5,10,"/static/portraits/mage.png"),
    rogue:  new Card("rogue",5,5,40,"/static/portraits/rogue.png"),
    panda: new Card("panda",5,35,5,"/static/portraits/druid.png")
}