import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { joinRoom, leaveRoom, subscribeToRoomUsers, unsubscribeFromRoomUsers } from "../api/rooms";

export function Room(props){
    const {id} = useParams()
    const [name, setName] = useState("");
    const [users,setUsers] = useState([]);
    useEffect(() => {
        joinRoom(id,(err, room) =>{
            if(err) return console.error(err);
            console.log(room);
            setName(room.name);
        })
        return leaveRoom;
    },[id])

    useEffect(() => {
        subscribeToRoomUsers((err,list) => {
            if(err) return console.error(err);
            setUsers(list);
        })
        return unsubscribeFromRoomUsers;
    },[id])
    return (
        <div>
            <h1>{name}</h1>
            {users.map(val => <h1>{val.name}</h1>)}
        </div>
    )
}