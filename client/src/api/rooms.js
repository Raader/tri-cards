import { socket } from "./socket";

export function subscribeToRoomList(callback){
    socket.on("roomList", list => callback(null, list));
    socket.emit("subToRoomList");
}

export function unsubscribeFromRoomList(){
    socket.removeAllListeners("roomList");
}

export function createRoom(name,cb){
    socket.on("createRoom",(room) => cb(null,room));
    socket.emit("createRoom",name)
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
export function unsubscribeFromRoomUsers(){
    socket.removeAllListeners("roomUsers");
}