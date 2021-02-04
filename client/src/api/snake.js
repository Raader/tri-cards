import { socket } from "./socket";

export function joinSnake(cb){
    socket.on("joinGame",(data) => cb(null,data))
    socket.emit("joinGame");
}

export function leaveSnake(){
    socket.removeAllListeners("joinGame");
    socket.emit("leaveSnake");
}

export function subToGameState(cb){
    socket.on("gameState",cb)
}

export function unSubFromGameState(){
    socket.removeAllListeners("gameState");
}

export function updateSnake(data){
    socket.emit("update",data);
}