const sockets = {}
let userList = []
let io;

function updateUserList(){
    userList = Object.keys(sockets).filter((id) => sockets[id] ? true : false);
    io.to("userListSubs").emit("userList",userList);
}

function connection(i,socket){
    io = i;
    sockets[socket.id] = socket;
    updateUserList()
    console.log("A socket has connected.");
}

function disconnect(socket){
    sockets[socket.id] = undefined;
    console.log("A socket has disconnected.");
    updateUserList()
}

function subToUserList(socket){
    socket.join("userListSubs");
    socket.emit("userList",userList);
}

function unsubFromUserList(socket){
    socket.leave("userListSubs");
}

module.exports.connection = connection;
module.exports.disconnect = disconnect;
module.exports.subToUserList = subToUserList;
module.exports.unsubFromUserList = unsubFromUserList;