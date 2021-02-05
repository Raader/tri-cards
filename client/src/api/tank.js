import {socket} from "./socket";

export function joinTank(cb){
    socket.on("joinGame",(info) => cb(null,info));
    socket.emit("joinGame")
}
export function leaveTank(){
    socket.removeAllListeners("joinGame");
    socket.emit("leaveGame");
}

export function tankUpdate(input){
    socket.emit("update",input);
}

export function subToGameState(cb){
    socket.on("gameState",(state) => cb(null,state));
}
export function subToDeath(cb){
    socket.on("death",() => cb(null));
}
export function unSubFromDeath(){
    socket.removeAllListeners("death");
}

export function unSubFromGameState(){
    socket.removeAllListeners("update");
}