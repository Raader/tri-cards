

const sockets = {}
let userList = []
let io;

/**
 * updates user list based on sockets
 */
function updateUserList(){
    userList = Object.keys(sockets).map((id) => sockets[id] ? sockets[id].user: "")
    userlist = userList.filter((val) => val);
    io.to("userListSubs").emit("userList",userList);
}

function connection(i,socket){
    //check if socket is already connected
    if(Object.values(sockets).find((s) => s && (s.user.id === socket.user.id))){
        return socket.disconnect(true);
    }
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