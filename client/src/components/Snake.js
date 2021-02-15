import p5 from "p5";
import { useEffect, useRef } from "react"
import { subscribeToGameStart, unsubscribeFromGameStart } from "../api/game";
import { user } from "../api/join";
import { joinSnake, leaveSnake, subToGameState, unSubFromGameState, updateSnake } from "../api/snake";
import { areaOutOfArea, collides, intersects } from "../game/Physics";
import { Snake as S, snakeMovement } from "../game/Snake";

export function Snake(props) {
    const canvas = useRef();
    let p = useRef();
    let s;
    let gameState;
    let gameData;
    let inputs = [];

    useEffect(() => {
        subToGameState((state) => {
            
            if(!state.snakes) return;
            s = state.snakes.find((val) => val.user.id === user._id);
            if(s){
            let input;
            let index;
            for(let i = 0; i < inputs.length;i++){
                if(inputs[i].time === s.time){
                    index = i;
                    input = inputs[i];
                }
            }
            if(input){
                inputs.splice(0,index + 1)
                for(let ip of inputs){
                    snakeMovement(s,ip);
                }
            }
            }
            gameState = state;
        })
        return unSubFromGameState;
    }, [])

    useEffect(() => {
        
        joinSnake((err, data) => {
            console.log("joined snake")
            gameData = data;
            gameState = data.gameState
            // eslint-disable-next-line react-hooks/exhaustive-deps
            p.current = new p5(sketch, canvas.current);

        })
        return () => {
            leaveSnake();
        };
    }, [])

    useEffect(() => {
        let loop;
        subscribeToGameStart(() => {
            console.log("snake started")
            loop = setInterval(() => {
                const input = { uKey: p.current.keyIsDown(87), dKey: p.current.keyIsDown(83), rKey: p.current.keyIsDown(68), lKey: p.current.keyIsDown(65) };
                updateSnake({ input,time:inputs.length });
                if(s){
                    snakeMovement(s,input);
                    inputs.push({input,time:inputs.length});
                } 
            }, 100)
        })
        return(() =>{
            clearInterval(loop);
            unsubscribeFromGameStart();
        })
    },[])


    useEffect(() => {

    })

    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(gameData.map.width, gameData.map.height);

        }
        p.draw = () => {
            p.background("moccasin")
            if (!gameState) return;
            for (let s of gameState.snakes) {
                p.push()
                p.fill(s.color)
                p.translate(s.x, s.y);
                p.rect(0, 0, s.width, s.height)
                p.pop()

                p.push()
                p.fill("red")
                p.rectMode(p.CENTER);
                p.translate(s.x, s.y);
                p.rect(s.width / 2, s.height / 2, 5, 5)
                p.pop()

                for (let part of s.parts) {
                    p.push()
                    p.fill(s.color)
                    p.translate(part.x, part.y);
                    p.rect(0, 0, s.width, s.height)
                    p.pop()
                }
            }
            for (let a of gameState.apples) {
                p.push()
                p.fill("red");
                p.translate(a.x, a.y);
                p.rect(0, 0, 25, 25)
                p.pop()
            }
        }
    }
    return (
        <div ref={ref => canvas.current = ref}>

        </div>
    )
}