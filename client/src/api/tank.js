import {socket} from "./socket";

export function joinTank(cb){
    socket.on("tankUpdate",(state) => cb(null,state));
    socket.emit("joinTank")
}

export function tankUpdate(input){
    socket.emit("tankUpdate",input);
}