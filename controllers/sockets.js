const sockets = {}
let userList = []
let io;

/**
 * updates user list based on sockets
 */
function updateUserList(){
    userList = Object.keys(sockets).filter((id) => sockets[id] ? true : false);
    io.to("userListSubs").emit("userList",userList);
}

function connection(i,socket){
    //adds socket to sockets list
    io = i;
    sockets[socket.id] = socket;
    updateUserList()
    console.log("A socket has connected.");
}

function disconnect(socket){
    //removes socket from the sockets list
    sockets[socket.id] = undefined;
    console.log("A socket has disconnected.");
    updateUserList()
}

function subToUserList(socket){
    //subscribes socket to receive userlist updates
    socket.join("userListSubs");
    socket.emit("userList",userList);
}

function unsubFromUserList(socket){
    //unsubscribes socket from recieving userlist updates
    socket.leave("userListSubs");
}

module.exports.connection = connection;
module.exports.disconnect = disconnect;
module.exports.subToUserList = subToUserList;
module.exports.unsubFromUserList = unsubFromUserList;