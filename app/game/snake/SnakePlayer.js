class SnakePlayer {
    constructor(x, y, width, height, color, user) {
        this.user = user;
        this.color = color
        this.onInput = 0;
        this.x = x;
        this.y = y;
        this.dir = {x:0,y:-1}
        this.speed = width;
        this.width = width;
        this.height = height;
        this.parts = [];
        this.dead = false;
        let curY = this.y + this.height;
        for(let i = 0; i < 2;i++){
            this.parts.push({x:this.x,y:curY,dir:{x:0,y:-1},width:this.width,height:this.height});
            curY += this.height;
        }
    }

    getArea = () => {
        return {
        x: this.x,
        y: this.y,
        width:this.width,
        height:this.height
        }
    }

    addPart = () => {
        this.parts.push({x:this.x,y:this.y,dir:{x:0,y:-1},width:this.width,height:this.height})
    }

    calculateDir = (input) => {
        if(input.uKey){
            this.dir = {x:0,y:-1};
        }
        else if(input.dKey){
            this.dir = {x:0,y:1};
        }
        else if(input.rKey){
            this.dir = {x:1,y:0};
        }
        else if(input.lKey){
            this.dir = {x:-1,y:0};
        }
    }

    calculateMovement = () => {
        const oldX = this.x;
        const oldY = this.y;
        const oldDir = {x:this.dir.x,y:this.dir.y};
        let curX = oldX;
        let curY = oldY;
        let curDir = oldDir;
        for(let part of this.parts){
            let oX = part.x;
            let oY = part.y;
            let oDir = part.dir;
            part.x = curX;
            part.y = curY;
            part.dir = curDir;
            curX = oX;
            curY = oY;
            curDir = oDir;
        }
        this.x += this.speed * this.dir.x;
        this.y += this.speed * this.dir.y;
        return [oldX,oldY];
    }
}

module.exports = SnakePlayer