const Instance = require("./Instance");

class Barrier extends Instance{
    constructor(x,y,width,height){
        super()
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    getArea = () => {
        return {
        x: this.x,
        y: this.y,
        width:this.width,
        height:this.height
        }
    }
    getData = () => {
        return {
            x: this.x,
            y: this.y,
            width:this.width,
            height:this.height,
        }
    }
    contains = function(x,y){
        return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
    }
}

module.exports = Barrier;