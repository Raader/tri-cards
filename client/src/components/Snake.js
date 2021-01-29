import p5 from "p5";
import { useEffect, useRef } from "react"
import { joinSnake, leaveSnake } from "../api/snake";

export function Snake(props){
    const canvas = useRef();
    let p = useRef();
    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(500,450)
        }
        p.draw = () => {
            p.background("blue")
        }
    }

    useEffect(() => {
        joinSnake((err,data) => console.log(data))
        p.current = new p5(sketch,canvas.current);
        return leaveSnake;
    },[])

    return(
    <div ref={ref => canvas.current = ref}>

    </div>
    )
}