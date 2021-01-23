class Player{
    name;
    id;
    speed = 2.5;
    dir = {x:0,y:0};
    onCooldown = false;
    dead = false;
    actions = {};
    bullets = [];
    constructor(id,name,x,y,width,height){
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    calculateDir = (uKey,dKey,rKey,lKey) => {
        const dir= {x:0,y:0}
        if(rKey){
            dir.x += 1;
        }
        if(lKey){
            dir.x += -1;
        }
        if(uKey){
            dir.y += -1;
        }
        if(dKey){
            dir.y += 1;
        }
        if(dir.x && dir.y){
            dir.x /= 2;
            dir.y /= 2;
        }
        return dir;
    }
    calculateMovement = (uKey,dKey,rKey,lKey) => {
        const oldx = this.x;
        const oldy = this.y;
        const dir = this.calculateDir(uKey,dKey,rKey,lKey);
        if(!dir.x && !dir.y) return {oldx:0,oldy:0};
        this.dir = dir;
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
        return {oldx,oldy}
    }
}

module.exports = Player;