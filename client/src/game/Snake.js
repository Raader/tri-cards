export class Snake {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.dir = {x:0,y:0}
        this.speed = 2.5;
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
    
    calculateMovement = (input) => {
        const oldX = this.x;
        const oldY = this.y;
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
        this.x += this.speed * this.dir.x;
        this.y += this.speed * this.dir.y;
        return [oldX,oldY];
    }
}