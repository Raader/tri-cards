const T = require("../game/tank/Tank");

class TankGame{
    constructor(sockets){
        this.game = new T.game();
        this.sockets = sockets;
        this.started = false;
    }

    start(cb){
        if(this.started) return;
        this.started = true;
        const sockets = this.sockets;
        for(let socket of sockets){
            socket.on("joinGame", () => {
                this.game.addPlayer(socket.user,socket.color,info => {
                    socket.emit("joinGame",info);
                    console.log(socket.user.name + " joined the game");
                    socket.on("update",(data) => {
                        this.game.updatePlayer(socket.user.id,data);
                    })
                    socket.on("fire",() => {
                        this.game.fire(socket.user.id)
                    })
                    
                })
            })
            socket.emit("startGame","tank");
        }
        this.game.start((state) => {
            for(let socket of sockets){
                socket.emit("gameState",state);
            }
        }, (id) => {
            const socket = this.sockets.find((val) => val.user.id === id);
            if(!socket) return;
            socket.emit("death");
        },cb)
    }

    removePlayer = (socket,cb) =>{
        this.game.removePlayer(socket.user.id,() => {
            socket.removeAllListeners("joinGame")
            socket.removeAllListeners("update")
            socket.removeAllListeners("fire")
            cb();
        })
    }

    stop = () => {
        this.game.stop()
    }
}

module.exports = TankGame;