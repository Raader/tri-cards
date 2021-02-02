const sockets = {}
let userList = []
let io;
const rooms = [];
const game = require("../app/game/tank/Tank").game;
const tankGame = new game();

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
    console.log( socket.user.name + " socket has connected.");
}
function disconnecting(socket){
    snakeGame.removeSnake(socket.user,() => console.log(socket.user.name + " left snake"))
    tankGame.removeTank(socket.user.id);
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
const barriers = [
    {x:100,y:50,width:50,height:300}
]
setInterval(() => {
    io.to("tank").emit("tankUpdate",tankGame.update((id) => {
        const socket = Object.values(sockets).find((val) => val && val.user.id === id);
        if(socket){
            socket.emit("death");
        }
    }));
},33)
function joinTank(socket){
    socket.join("tank");
    tankGame.addTank(socket.user);
    socket.emit("joinTank",{info:tankGame.getInfo(),gameState:tankGame.update()});
    console.log(socket.user.name + " joined tank")
}

function leaveTank(socket){
    socket.leave("tank");
    tankGame.removeTank(socket.user.id);
    console.log(socket.user.name + " left tank");
}

function tankUpdate(socket,input){
    tankGame.moveTank(socket.user.id,input)
}

function fireBullet(socket){
    tankGame.fire(socket.user.id);
}

const Snake = require("../app/game/snake/Snake");
const snakeGame = new Snake();
setInterval(() =>{
    io.to("snake").emit("gameState",snakeGame.update())
})
function joinSnake(socket){
    snakeGame.addSnake(socket.user,(data) => {
        socket.join("snake");
        socket.emit("joinSnake",data)
        console.log(socket.user.name + " joined snake");
    })
}

function leaveSnake(socket){
    snakeGame.removeSnake(socket.user, () => {
        socket.leave("snake");
        console.log(socket.user.name + " left snake");
    })
}

function snakeUpdate(socket,data){
    snakeGame.snakeUpdate(socket.user,data);
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
module.exports.leaveTank = leaveTank;
module.exports.tankUpdate = tankUpdate;
module.exports.fireBullet = fireBullet;
module.exports.joinSnake = joinSnake;
module.exports.leaveSnake = leaveSnake;
module.exports.snakeUpdate = snakeUpdate;
