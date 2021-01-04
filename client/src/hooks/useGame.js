import { useEffect, useState } from "react";
import { subscribeToUserList, unsubscribeFromUserList } from "../api/users";

export function useGame(){
    const [userList, setUserList] = useState([]);
    
    useEffect(() => {
        subscribeToUserList((err,list) => setUserList(list));
        return(() => unsubscribeFromUserList())
    },[]);

    return({userList})
}