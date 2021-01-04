import { useEffect, useState } from "react"
import {user as u, login as l, register as r,token, getUser} from "./api/join";
import { useHistory } from "react-router-dom";

export function useUser(){
    const [user,setUser] = useState(null)
    useEffect(() => {
        console.log("reload",user)
        if(token && !user) {
            getUser(token,(err,data) => {
                if(err) return console.error(err);
                setUser(data.user);
            })
        }
        if(!user) setUser(u);
    },[user])

    const login = (email,password) =>{
        l(email,password,(err,data)=>{
            if(err) return console.error(err);
            console.log(data.user);
            setUser(data.user);
            window.location.pathname = "/";
        })
    }
    const register = (name,email,password) =>{
        r(name,email,password,(err,data)=>{
            if(err) return console.error(err);
            console.log(data.user);
            setUser(data.user);
            window.location.pathname = "/";
        })
    }
    return({user,login,register})
}