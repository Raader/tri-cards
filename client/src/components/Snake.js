import p5 from "p5";
import { useEffect, useRef } from "react"

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
        p.current = new p5(sketch,canvas.current);
    },[])
    return(
    <div ref={ref => canvas.current = ref}>

    </div>
    )
}