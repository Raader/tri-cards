const S = require("../game/snake/Snake");

class SnakeGame {
    constructor(sockets) {
        this.game = new S();
        this.sockets = sockets;
        this.game = new S((state) => {
            for(let user of sockets){
                user.emit("gameState",state)
            }
        });
    }

    start = (cb) => {
        const sockets = this.sockets;
        for (let user of sockets) {
            user.on("joinGame", () => {
                this.game.addPlayer(user.user,user.color, (info) => {
                    user.emit("joinGame", info);
                    console.log(user.user.name + " joined the game");
                    user.on("update", (data) => {
                        this.game.updatePlayer(user.user, data)
                    })
                })
            })
            user.emit("startRoom", "snake");
        }
        setTimeout(() => {
            for(let user of sockets){
                user.emit("gameStart");
            }
            this.game.start((state) => {
                for(let user of sockets){
                    user.emit("gameState",state)
                }
            },cb);
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