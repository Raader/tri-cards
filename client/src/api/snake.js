import socketHandler from "../../../routes/sockets";
import { socket } from "./socket";

export function joinSnake(cb){
    socket.on("joinSnake",cb)
    socket.emit("joinSnake");
}

export function subToGameState(cb){
    socket.on("gameState",cb)
}


export function updateSnake(data){
    socket.emit("snakeUpdate",data);
}