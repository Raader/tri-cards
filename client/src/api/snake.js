import { socket } from "./socket";

export function joinSnake(cb){
    socket.on("joinSnake",(data) => cb(null,data))
    socket.emit("joinSnake");
}
export function leaveSnake(){
    socket.removeAllListeners("joinSnake");
    socket.emit("leaveSnake");
}

export function subToGameState(cb){
    socket.on("gameState",cb)
}

export function unSubFromGameState(){
    socket.removeAllListeners("gameSate");
}

export function updateSnake(data){
    socket.emit("snakeUpdate",data);
}