const S = require("../game/snake/Snake");

class SnakeGame {
    constructor(sockets) {
        this.game = new S();
        this.sockets = sockets;
    }

    start = (cb) => {
        const sockets = this.sockets;
        for (let user of sockets) {
            user.emit("startGame", "snake");
            user.on("joinGame", () => {
                this.game.addPlayer(user.user, (info) => {
                    user.emit("joinGame", info);
                    console.log(user.user.name + " joined the game");
                })
            })
            user.on("update", (data) => {
                this.game.updatePlayer(user.user, data)
            })
        }
        this.game.start((state) => {
            for(let user of sockets){
                user.emit("gameState",state)
            }
            if(cb) cb();
        });
    }

    removePlayer = (socket,cb) =>{
        this.game.removePlayer(socket.user,() => {
            socket.removeAllListeners("joinGame")
            socket.removeAllListeners("update")
            cb();
        })
    }

    stop = () => {
        this.game.stop()
    }
}

module.exports = SnakeGame;