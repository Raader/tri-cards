import { useEffect } from "react";
import io from "socket.io-client";
import { token } from "./join";

const server = "localhost:5000";
let socket;

function SocketClient(){
    useEffect(() => {
        if(process.env.NODE_ENV === "production"){
            socket = io({auth:{token}});
        }
        else socket = io(server,{auth:{token}});
        return(() => socket.disconnect())
    },[])
    return(
        <header>
            
        </header>
    )
}
export {socket,SocketClient}