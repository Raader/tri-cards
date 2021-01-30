import p5 from "p5";
import { useEffect, useRef } from "react"
import { joinSnake, leaveSnake } from "../api/snake";
import { areaOutOfArea } from "../game/Physics";
import { Snake as S } from "../game/Snake";

export function Snake(props){
    const canvas = useRef();
    let p = useRef();
    let snake;
    

    useEffect(() => {
        joinSnake((err,data) =>{
            console.log(data)
            // eslint-disable-next-line react-hooks/exhaustive-deps
            snake = new S(200,200,25,25);
            p.current = new p5(sketch,canvas.current);
        })
        return leaveSnake;
    },[])

    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(500,450)
        }
        p.draw = () => {
            const input = { uKey: p.keyIsDown(87), dKey: p.keyIsDown(83), rKey: p.keyIsDown(68), lKey: p.keyIsDown(65) };
            const [oldX,oldY] = snake.calculateMovement(input);
            if(areaOutOfArea(snake.getArea(),{x:0,y:0,width:500,height:450})){
                snake.x = oldX;
                snake.y = oldY
            }
            p.background("moccasin")
            p.push()
            p.fill("lightgreen")
            p.rectMode(p.CENTER);
            p.translate(snake.x,snake.y);
            p.rect(0,0,snake.width,snake.height)
            p.pop()
        }
    }
    return(
    <div ref={ref => canvas.current = ref}>

    </div>
    )
}