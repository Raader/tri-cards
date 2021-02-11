const sockets = {}
let userList = []
let io;
const rooms = [];
const game = require("../app/game/tank/Tank").game;
const tankGame = new game();
const Room = require("../app/Room");

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
    io.emit("userList",userList);
}

function updateRoomList(){
    const list = rooms.map(val => {
        return {name:val.name,id:val.id,started:val.started};
    });
    io.emit("roomList",list)
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
    console.log( socket.user.name + " socket has connected.");
}
function disconnecting(socket){
    snakeGame.removePlayer(socket.user,() => console.log(socket.user.name + " left snake"))
    tankGame.removePlayer(socket.user.id);
    leaveRoom(socket);
    
}
function disconnect(socket,reason){
    //removes socket from the sockets list
    console.log(socket.user.name + " socket has disconnected." + reason);
    sockets[socket.id] = undefined;
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

function createRoom(socket,data){
    const roomName = data.name;
    if(socket.room) return;
    const id = generateId();
    const room = new Room(roomName,data.game,id,socket.user,
    (list) => {
        io.to(id).emit("roomUsers",list)
    },() => {
        rooms.splice(rooms.indexOf(room),1);
        updateRoomList();
        console.log("removed room: " + room.name);
    })
    rooms.push(room);
    socket.emit("createRoom",{name:room.name,id:room.id});
    console.log(socket.user.name + " created room: " +room.name + "(" + room.id + ")");
    updateRoomList();
}

function joinRoom(socket,id){
    if(socket.room) return;
    const room = rooms.find((val) => val.id.localeCompare(id) === 0);
    if(!room) return;
    socket.join(id);
    socket.room = room;
    room.addUser(socket,(isHost) => {
        socket.emit("joinRoom",{id:room.id,name:room.name,game:room.gameName,isHost});
        console.log(socket.user.name + " joined the room: " + room.name);
    })
}

function leaveRoom(socket){
    if(!socket.room) return;
    const room = socket.room
    socket.leave(socket.room.id);
    room.removeUser(socket,() => {
        console.log(socket.user.name + " left the room: " + room.name);
    })
    socket.room = null;
}

function startGame(socket){
    if(!socket.room || socket.room.started) return;
    const room = socket.room
    room.startGame(socket);
    updateRoomList();
}

module.exports.connection = connection;
module.exports.disconnect = disconnect;
module.exports.disconnecting = disconnecting;
module.exports.subToUserList = subToUserList;
module.exports.unsubFromUserList = unsubFromUserList;
module.exports.subToRoomList = subToRoomList;
module.exports.unsubFromRoomList = unsubFromRoomList;
module.exports.createRoom = createRoom;
module.exports.joinRoom = joinRoom;
module.exports.leaveRoom = leaveRoom;
module.exports.startGame = startGame;
