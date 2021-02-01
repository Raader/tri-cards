class Game{
    snakes = [];

    addSnake = (user,cb) => {
        const snake = this.snakes.find((val) => val.user.id === user.id);
        if(snake) return;
        this.snakes.push({user:user,x:0,y:0,width:25,height:25,parts:[]});
        cb();
    }

    removeSnake = (user,cb) => {
        this.snakes.splice(this.snakes.indexOf(this.snakes.find((val) => val.user.id === user.id)),1);
        cb()
    }

}

module.exports = Game;