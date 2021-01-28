const Instance = require("./Instance")

class Bullet extends Instance{
    constructor(x,y,width,height,dir,speed,destroy){
        super();
        this.destroy = destroy;
        this.x = x;
        this.y = y,
        this.dir = dir;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    getArea = () => {
        return {
        x: this.x - this.width/2,
        y: this.y - this.height/2,
        width:this.width,
        height:this.height
        }
    }

    getData = () => {
        return {
            x:this.x,
            y:this.y,
            dir:this.dir,
            width:this.width,
            height:this.height,
        }
    }

    update = () => {
        this.calculateMovement();
    }

    onCollision = (collider) => {
        if(collider.constructor.name === "Player" ){
        }
        this.destroy()
    }
 
    calculateMovement = () => {
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
    }
}

module.exports = Bullet;