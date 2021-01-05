import { useEffect, useState } from "react"
import {user as u, login as l, register as r,token, getUser} from "../api/join";

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

    const login = (email,password,cb) =>{
        l(email,password,(err,data)=>{
            if(err) return cb(err);
            console.log(data.user);
            setUser(data.user);
            cb(null,data.user);
            window.location.pathname = "/";
        })
    }
    const register = (name,email,password,cb) =>{
        r(name,email,password,(err,data)=>{
            if(err) return cb(err);
            console.log(data.user);
            setUser(data.user);
            cb(null,data.user);
            window.location.pathname = "/";
        })
    }
    const logout = () => {
        setUser(null);
        localStorage.setItem("token","");
        window.location.pathname = "/";
    }
    return({user,login,register,logout})
}