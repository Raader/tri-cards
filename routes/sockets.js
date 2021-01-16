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

    socket.on("disconnect", () => {
        controller.disconnect(socket);
    });
    
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
}

module.exports = socketHandler;