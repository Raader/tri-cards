import { useEffect } from "react";
import io from "socket.io-client";

const server = "localhost:5000"
let socket;

function SocketClient(){
    useEffect(() => {
        socket = io(server);
        return(() => socket.disconnect())
    },[])
    return(
        <header>
            
        </header>
    )
}
export {socket,SocketClient}