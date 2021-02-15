const S = require("../game/snake/Snake");

class SnakeGame {
    constructor(sockets,onUsers) {
        this.game = new S();
        this.sockets = sockets;
        this.onUsers = onUsers;
        this.game = new S((state) => {
            for(let user of sockets){
                user.emit("gameState",state)
            }
        },onUsers);
    }

    start = (cb) => {
        const sockets = this.sockets;
        for (let i = 0; i < sockets.length; i++) {
            const user = sockets[i];
            user.on("joinGame", () => {
                this.game.addPlayer(user.user,user.color, (info) => {
                    user.emit("joinGame", info);
                    console.log(user.user.name + " joined the game");
                    user.on("update", (data) => {
                        this.game.updatePlayer(user.user, data)
                    })
                    if(i >= this.sockets.length - 1){
                        this.startGame(cb);
                    }
                })
            })
            user.emit("startRoom", "snake");
        }
    }

    startGame = (cb) => {
        setTimeout(() => {
            for(let user of this.sockets){
                user.emit("gameStart");
            }
            this.game.start((state) => {
                for(let user of this.sockets){
                    user.emit("gameState",state)
                }
            },this.onUsers);
        },3000)
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