import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserById } from "../api/join";

export function Profile(){
    const {id} = useParams();
    const [user,setUser] = useState();
    useEffect(() => {
        getUserById(id,(err,data) => {
            if(err) return console.error(err);
            setUser(data);
        })
    },[id])
    return(
        <div>
            <h1>{user ? user.name : ""}</h1>
        </div>
    )
}