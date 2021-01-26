import {socket} from "./socket";

export function joinTank(cb){
    socket.on("joinTank",(info) => cb(null,info));
    socket.emit("joinTank")
}

export function tankUpdate(input){
    socket.emit("tankUpdate",input);
}

export function subToGameState(cb){
    socket.on("tankUpdate",(state) => cb(null,state));
}
export function subToDeath(cb){
    socket.on("death",() => cb(null));
}

export function unSubFromGameState(){
    socket.on("tankUpdate",null);
}