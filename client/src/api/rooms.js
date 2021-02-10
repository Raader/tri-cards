import { socket } from "./socket";

export function subscribeToRoomList(callback){
    socket.on("roomList", list => callback(null, list));
    socket.emit("subToRoomList");
}

export function unsubscribeFromRoomList(){
    socket.removeAllListeners("roomList");
}

export function createRoom(name,game,cb){
    socket.on("createRoom",(room) => cb(null,room));
    socket.emit("createRoom",{name,game})
}
export function joinRoom(id,cb){
    socket.on("joinRoom", (room) => cb(null,room));
    socket.emit("joinRoom", id);
}

export function leaveRoom(){
    socket.removeAllListeners("joinRoom");
    socket.emit("leaveRoom");
}

export function subscribeToRoomUsers(cb){
    socket.on("roomUsers",(list) => cb(null,list));
}

export function startGame(){
    socket.emit("startGame");
}
export function unsubscribeFromRoomUsers(){
    socket.removeAllListeners("roomUsers");
}

export function subscribeToGameStart(cb){
    socket.on("startGame",(name) => cb(null,name))
}

export function unsubscribeFromGameStart(cb){
    socket.removeAllListeners("startGame");
}
