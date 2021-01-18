import { useEffect, useState } from "react"
import { getAllCards } from "../api/game"
import { GameCard } from "./Card"

export function Cards(){
    const [cards,setCards] = useState([])
    useEffect(() => {
        getAllCards((err,list) => {
            if(err) return console.error(err);
            setCards(list);
        })
    },[])
    return (
        <div id="cards">
            {cards.map(val => (
                <div id="card-slot">
            <GameCard name={val.name} portrait={val.portrait} power={val.power} endurance={val.endurance} speed={val.speed}></GameCard>
            </div>))}
        </div>
    )
}