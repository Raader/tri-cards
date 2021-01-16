import { useEffect, useState } from "react"
import { getAllCards } from "../api/game"

export function Cards(){
    const [cards,setCards] = useState([])
    useEffect(() => {
        getAllCards((err,list) => {
            if(err) return console.error(err);
            setCards(list);
        })
    },[])
    return (
        <div>
            {cards.map(val => 
            <div> 
                <h1>{val.name}</h1>
                <img className="portrait" alt="hello" src={val.portrait} />
            </div>)}
        </div>
    )
}