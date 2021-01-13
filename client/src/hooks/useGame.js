import { useEffect, useState } from "react";
import { subscribeToRoomList, unsubscribeFromRoomList, createRoom as cr } from "../api/rooms";
import { subscribeToUserList, unsubscribeFromUserList } from "../api/users";

export function useGame(){
    const [userList, setUserList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    
    useEffect(() => {
        subscribeToUserList((err,list) => setUserList(list));
        return(() => unsubscribeFromUserList())
    },[]);
    useEffect(() => {
        subscribeToRoomList((err,list) => setRoomList(list));
        return(() => unsubscribeFromRoomList())
    })
    const createRoom = (name) => {
        cr(name)
    }
    return({userList,roomList,createRoom})
}