const controller = require("../controllers/sockets")

/**
*handles events fired from sockets
*/
function socketHandler(io, socket){
    controller.connection(io, socket);

    socket.on("subToUserList", () => {
        controller.subToUserList(socket);
    });

    socket.on("unsubFromUserList", () => {
        controller.unsubFromUserList(socket);
    });

    socket.on("disconnect", (reason) => {
        controller.disconnect(socket,reason);
    });
    
    socket.on("disconnecting", () => {
        controller.disconnecting(socket);
    })
    socket.on("subToRoomList",() => {
        controller.subToRoomList(socket);
    })

    socket.on("unsubFromRoomList",() => {
        controller.unsubFromRoomList(socket)
    })

    socket.on("createRoom",(roomName) => {
        controller.createRoom(socket,roomName)
    })

    socket.on("joinRoom", (id) => {
        controller.joinRoom(socket,id)
    })

    socket.on("leaveRoom", () => {
        controller.leaveRoom(socket);
    })

    socket.on("startGame", () => {
        controller.startGame(socket);
    })

    socket.on("joinTank",() => {
        controller.joinTank(socket);
    })

    socket.on("leaveTank", () => {
        controller.leaveTank(socket);
    })

    socket.on("tankUpdate",(pos) => {
        controller.tankUpdate(socket,pos);
    })
    socket.on("fireBullet", () => {
        controller.fireBullet(socket);
    })

    socket.on("joinSnake", () => {
        controller.joinSnake(socket)
    })

    socket.on("leaveSnake", () => {
        controller.leaveSnake(socket);
    })
    
    socket.on("snakeUpdate", (data) => {
        controller.snakeUpdate(socket,data)
    })
}

module.exports = socketHandler;