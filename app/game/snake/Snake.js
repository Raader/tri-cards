class Game{
    snakes = [];

    addSnake = (user,cb) => {
        const randomcolor = require("randomcolor");
        const snake = this.snakes.find((val) => val.user.id === user.id);
        if(snake) return;
        this.snakes.push({user:user,color:randomcolor(),x:0,y:0,width:25,height:25,parts:[]});
        cb({map:{height:500,width:500}});
    }

    removeSnake = (user,cb) => {
        this.snakes.splice(this.snakes.indexOf(this.snakes.find((val) => val.user.id === user.id)),1);
        cb()
    }

    snakeUpdate = (user,data,cb) => {
        const snake = this.snakes.find((val) => val.user.id === user.id);
        if(!snake || !data) return;
        snake.x = data.x;
        snake.y = data.y;
        snake.dead = data.dead;
        snake.parts = []
        for(let part of data.parts){
            snake.parts.push(part);
        }
    }

    update = () => {
        const gameState = {snakes:this.snakes.filter((val) => !val.dead)};
        return gameState;
    }

}

module.exports = Game;