import { useEffect, useRef } from "react";
import io from "socket.io-client";
export function useGame(){
    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io("http://localhost:5000");
        return(() => {
            socketRef.current.disconnect();
        })
    })
}