const controller = require("../controllers/sockets")

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
}

module.exports = socketHandler;