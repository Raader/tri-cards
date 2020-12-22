import { socket } from "./socket";

export function subscribeToUserList(callback){
    socket.on("userList", list => callback(null, list));
    socket.emit("subToUserList");
}

export function unsubscribeFromUserList(){
    socket.emit("unsubFromUserList");
}