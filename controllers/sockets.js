const sockets = {}
let userList = []
let io;
const rooms = [];

/**
 * updates user list based on sockets
 */
function updateUserList(){
    userList = []
    for(let socket of Object.values(sockets)){
        if(socket) {
            userList.push(socket.user);
        }
    }
    io.to("userListSubs").emit("userList",userList);
}

function updateRoomList(){
    const list = rooms.map(val => {
        return {name:val.name,id:val.id};
    });
    io.to("roomListSubs").emit("roomList",list)
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

function subToRoomList(socket){
    //subscribes socket to receive roomlist updates
    socket.join("roomListSubs")
    socket.emit("roomList",rooms.map(val => {
        return {name:val.name,id:val.id};
    }))
}

function unsubFromRoomList(socket){
    //unsubscribes socket from recieving roomlist updates
    socket.leave("roomListSubs")
}

function generateId(length = 5){
    let id = ""
    for(let i = 0;i < length;i++){
        id += Math.floor(Math.random() * 10);
    }
    return id;
}

function createRoom(socket,roomName){
    const room = {
        name:roomName,
        id:generateId()
    }
    socket.join(room.id);
    rooms.push(room);
    updateRoomList();
}
module.exports.connection = connection;
module.exports.disconnect = disconnect;
module.exports.subToUserList = subToUserList;
module.exports.unsubFromUserList = unsubFromUserList;
module.exports.subToRoomList = subToRoomList;
module.exports.unsubFromRoomList = unsubFromRoomList;
module.exports.createRoom = createRoom;