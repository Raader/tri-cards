class Bullet{
    constructor(x,y,width,height,dir,speed){
        this.x = x;
        this.y = y,
        this.dir = dir;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    calculateMovement = () => {
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
    }
}

module.exports = Bullet;