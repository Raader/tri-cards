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

function updateRoomUsers(room){
    if(room.sockets.length <= 0){
        return removeRoom(room);
    }
    const list = room.sockets.map((socket) => {
        return {
            name:socket.user.name,
            _id:socket.user.id
        }
    });
    console.log(list)
    io.to(room.id).emit("roomUsers",list);
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
function disconnecting(socket){
    if(socket.isTank){
        tanks.splice(tanks.indexOf(tanks.find((val) => val.id === socket.id)),1);
    }
    leaveRoom(socket);
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
    if(socket.room) return;
    const room = {
        name:roomName,
        id:generateId(),
        sockets:[]
    }
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
    const isHost = room.sockets.length <= 0;
    socket.room = room;
    socket.room.sockets.push(socket);
    socket.emit("joinRoom",{id:socket.room.id,name:socket.room.name,isHost});
    console.log(socket.user.name + " joined the room: " + socket.room.name);
    updateRoomUsers(socket.room);
}

function leaveRoom(socket){
    if(!socket.room) return;
    const room = socket.room
    socket.leave(socket.room.id);
    room.sockets.splice(room.sockets.indexOf(socket),1);
    socket.room = null;
    console.log(socket.user.name + " left the room: ");
    updateRoomUsers(room);
}

function removeRoom(room){
    rooms.splice(rooms.indexOf(room),1);
    console.log("removed room: " + room.name);
}

const state={}
const tanks = []
setInterval(() => {
    io.to("tank").emit("tankUpdate",tanks);
},10)
function joinTank(socket){
    if(socket.isTank) return;
    socket.join("tank");
    socket.isTank = true;
    tanks.push({id:socket.user.id, x: 0,y: 0,dir:{x:0,y:0}})
}

function tankUpdate(socket,pos){
    const tank = tanks.find((val) => val.id === socket.user.id);
    if(!tank) return;
    tank.x = pos.x;
    tank.y = pos.y;
    tank.dir = pos.dir;
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
module.exports.joinTank = joinTank;
module.exports.tankUpdate = tankUpdate;