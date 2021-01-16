function getAllCards(req,res){
    const cards = require("../app/game/cards");
    const list = Object.values(cards);
    res.json({list});
}

module.exports.getAllCards = getAllCards;