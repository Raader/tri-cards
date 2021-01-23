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

    getArea = () => {
        return {
        x: this.x - this.width/2,
        y: this.y - this.height/2,
        width:this.width,
        height:this.height
        }
    }
    
    collides(point,area){
        return area.x - area.width/2 <= point.x && point.x <= area.x + area.width/2 && area.y - area.height/2 <= point.y && point.y <= area.y + area.height/2;
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

    intersects(area){
        const x = this.x
        const y = this.y
        const width = this.width;
        const height = this.height;
        const corners = [
            {x: x + width/2,y: y + height/2},
            {x: x - width/2,y: y - height/2},
            {x: x + width/2,y: y - height/2},
            {x: x - width/2,y: y + height/2},
        ]
        for(let corner of corners){
            if(this.collides(corner,area)){
                return true;
            }
        }
        return false;
    }
}

module.exports = Player;