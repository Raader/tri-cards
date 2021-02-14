import { socket } from "./socket";
export function getAllCards(cb){
    fetch("/api/game/cards")
    .then(res => res.json())
    .then(data => {
        if(!data.list) throw new Error("no list");
        cb(null,data.list)
    })
    .catch(err => {
        cb(err);
    })
}

export function subscribeToGameStart(cb){
    socket.on("gameStart",cb)
}
export function unsubscribeFromGameStart(){
    socket.removeAllListeners("gameStart");
}