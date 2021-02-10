import p5 from "p5";
import { useEffect, useRef } from "react"
import { joinSnake, leaveSnake, subToGameState, unSubFromGameState, updateSnake } from "../api/snake";
import { areaOutOfArea, collides, intersects } from "../game/Physics";
import { Snake as S } from "../game/Snake";

export function Snake(props){
    const canvas = useRef();
    let p = useRef();
    let snake;
    let gameState;
    let gameData;

    useEffect(() => {
        subToGameState((state) => {
            gameState = state;
        })
        return unSubFromGameState;
    },[])

    useEffect(() => {
        let loop;
        joinSnake((err,data) =>{
            gameData = data;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            snake = new S(25,25,25,25);
            p.current = new p5(sketch,canvas.current);
            loop = setInterval(() => {
            if(!gameState) return;
            const input = { uKey: p.current.keyIsDown(87), dKey: p.current.keyIsDown(83), rKey: p.current.keyIsDown(68), lKey: p.current.keyIsDown(65) };
            const [oldX,oldY] = snake.calculateMovement(input);
            if(areaOutOfArea(snake.getArea(),{x:0,y:0,width:500,height:500})){
                snake.dead = true;
            }
            for(let sn of gameState.snakes){
                for(let part of sn.parts){
                    if(collides({x:snake.x + snake.width/2,y:snake.y + snake.height/2},part)){
                        snake.dead = true;
                    }
                }
            }
            updateSnake({dead:snake.dead,dir:snake.dir,x:snake.x,y:snake.y,parts:snake.parts.map((val) => ({x:val.x,y:val.y,width:val.width,height:val.height}))});
            },100)
        })
        return () => {
            clearInterval(loop)
            leaveSnake();
        };
    },[])



    useEffect(() => {

    })

    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(gameData.map.width,gameData.map.height);
            
        }
        p.draw = () => {          
            p.background("moccasin")
            if(!gameState) return;
            for(let s of gameState.snakes){
                p.push()
            p.fill(s.color)
            p.translate(s.x,s.y);
            p.rect(0,0,snake.width,snake.height)
            p.pop()

            p.push()
            p.fill("red")
            p.rectMode(p.CENTER);
            p.translate(s.x,s.y);
            p.rect(snake.width/2,snake.height/ 2,5,5)
            p.pop()

            for(let part of s.parts){
            p.push()
            p.fill(s.color)
            p.translate(part.x,part.y);
            p.rect(0,0,snake.width,snake.height)
            p.pop()
            }
            }
            for(let a of gameState.apples){
                p.push()
                p.fill("red");
                p.translate(a.x,a.y);
                p.rect(0,0,snake.width,snake.height)
                p.pop()
            }
        }
    }
    return(
    <div ref={ref => canvas.current = ref}>

    </div>
    )
}