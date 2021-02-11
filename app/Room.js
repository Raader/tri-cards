const Snake = require("./minigames/SnakeGame");
const Tank = require("./minigames/TankGame");
class Room{
    users = [];
    owner;
    started = false;
    games = {
        "tank": Tank,
        "snake": Snake
    }

    constructor(name,game,id,owner,onUsers,removeRoom){
        this.name = name;
        this.id = id;
        this.owner = owner;
        this.onUsers = onUsers;
        this.removeRoom = removeRoom;
        this.game = new this.games[game](this.users);
        this.gameName = game;
    }

    updateUsers = () => {
        if(this.users.length <= 0) {
            this.game.stop();
            return this.removeRoom();
        }
        const list = this.users.map((val) => ({name:val.user.name,_id:val.user.name,score:val.score,dead:val.dead,color:val.color}));
        this.onUsers(list);
    }

    addUser = (socket,cb) => {
        if(this.started) return;
        const u = this.users.find((val) => val.user.id === socket.user.id);
        if(u) return;
        const randomcolor = require("randomcolor");
        socket.score = 0;
        socket.dead = false;
        socket.color = randomcolor();
        this.users.push(socket);
        cb(socket.user.id === this.owner.id);
        this.updateUsers()
    } 

    removeUser = (socket,cb) => {
        const u = this.users.find((val) => val.user.id === socket.user.id);
        if(!u) return;
        this.game.removePlayer(u,() => {
            this.users.splice(this.users.indexOf(u),1);
            cb();
            this.updateUsers()
        });
    }

    startGame = (socket) => {
        if(socket.user.id === this.owner.id && !this.started){
            console.log("start")
            this.started = true;
            this.game.start((players) => {
                if(!players) return;
                for(let player of players){
                    const user = this.users.find((val) => val.user.id == player.user.id);
                    if(user){
                        user.score = player.score;
                        user.dead = player.dead;
                    }
                }
                this.updateUsers();
            })
        }
    }

}

module.exports = Room;