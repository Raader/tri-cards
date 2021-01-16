class Card{
    constructor(name,pow,end,spd,portrait){
        this.name = name;
        this.portrait = portrait;
        this.power = pow;
        this.endurance = end;
        this.speed = spd
    }
}

module.exports = Card;