const Game = require("../Game");
const random = require("better-random");
const SnakePlayer = require("./SnakePlayer");
const physics = require("../physics");

class SnakeGame extends Game{
    snakes = [];
    apples = [];
    map= {
        height:500,
        width:500
    }
    constructor(){
        super();
    }
    start = (cb) => {
        this.loop = setInterval(() => cb(this.update()),100);
        this.createApple();
    }

    createApple = () => {
        const pad = 25;
        let x = random.randInt(0,this.map.width - pad);
        let y = random.randInt(0,this.map.height - pad);
        while(x % pad !== 0 || y % pad !== 0){
            x = random.randInt(0,this.map.width - pad);
            y = random.randInt(0,this.map.height - pad);
        }
        this.apples.push({x,y,width:25,height:25})
    }

    randomTile = () => {
        const pad = 25;
        let x = random.randInt(0,this.map.width - pad);
        let y = random.randInt(0,this.map.height - pad);
        while(x % pad !== 0 || y % pad !== 0){
            x = random.randInt(0,this.map.width - pad);
            y = random.randInt(0,this.map.height - pad);
        }
        return {x,y}
    }

    stop = () => {
        clearInterval(this.loop);
    }

    addPlayer = (user,cb) => {
        const randomcolor = require("randomcolor");
        const snake = this.snakes.find((val) => val.user.id === user.id);
        if(snake) return;
        const tile = this.randomTile();
        const newSnake = new SnakePlayer(tile.x,tile.y,25,25,randomcolor(),user);
        this.snakes.push(newSnake);
        cb({map:this.map,gameState:this.update()});
    }

    removePlayer = (user,cb) => {
        this.snakes.splice(this.snakes.indexOf(this.snakes.find((val) => val.user.id === user.id)),1);
        cb()
    }

    updatePlayer = (user,data,cb) => {
        const snake = this.snakes.find((val) => val.user.id === user.id);
        if(!snake || !data) return;
        //snake.x = data.x;
        //snake.y = data.y;
        //snake.dead = data.dead;
        //snake.parts = []
        //for(let part of data.parts){
            //snake.parts.push(part);
        //}
        snake.dir = data.dir;
    }

    update = () => {
        for(let snake of this.snakes){
            snake.calculateMovement();
            if(physics.areaOutOfArea(snake.getArea(),{x:0,y:0,width:this.map.width,height:this.map.height})){
                snake.dead = true;
            }
            else{
                for(let other of this.snakes){
                    for(let part of other.parts){
                        if(physics.collides({x:snake.x + snake.width/2,y:snake.y + snake.height/2},part)){
                            snake.dead = true;
                        }
                    }
                }
            }
        }
        const gameState = {snakes:this.snakes.filter((val) => !val.dead),apples:this.apples};
        return gameState;
    }

}

module.exports = SnakeGame;