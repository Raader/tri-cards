class Bullet{
    constructor(x,y,width,height,dir,speed){
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

    calculateMovement = () => {
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
    }
}

module.exports = Bullet;