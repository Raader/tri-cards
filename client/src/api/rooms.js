import { socket } from "./socket";

export function subscribeToRoomList(callback){
    socket.on("roomList", list => callback(null, list));
    socket.emit("subToRoomList");
}

export function unsubscribeFromRoomList(){
    socket.emit("unsubFromRoomList");
}

export function createRoom(name){
    socket.emit("createRoom",name)
}