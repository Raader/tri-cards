import { useEffect, useRef, useState } from "react"
import { user } from "../api/join";
import { socket } from "../api/socket";
import { joinTank, tankUpdate } from "../api/tank";
const p5 = require("p5");

export function Tank(props){
    const canvas = useRef();
    let gameState = {};
    let p = useRef();
    useEffect(() => {
        console.log("socket: ",socket)
        joinTank((err,state) => gameState = state);
        p.current = new p5(sketch, canvas.current);
    },[])

    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(400, 400);
            p.rectMode(p.CENTER);
            setInterval(() => {
                tankUpdate({uKey:p.keyIsDown(87),dKey:p.keyIsDown(83),rKey:p.keyIsDown(68),lKey:p.keyIsDown(65)})
            },10)
        }
        p.keyPressed = () => {
            if(p.keyCode === 32){
                socket.emit("fireBullet");
            }
        }
        p.draw = () => {
            if(!gameState.tanks) return;
            //x = p.mouseX;
            //y = p.mouseY
            p.background("lightblue")
            for(let barrier of gameState.barriers){       
                p.push();
                p.rectMode(p.CORNER)
                p.rect(barrier.x,barrier.y,barrier.width, barrier.height);
                p.pop();
            }
            for(let tank of gameState.tanks){
                if(tank.dead) continue;
                let lx = tank.x;
                let ly = tank.y;
                let color = "green";
                let r = 0;
                let v1 = p.createVector(tank.dir.x,tank.dir.y);
                let heading = v1.heading();
                r = heading.toFixed(2);
                if(user && tank.id === user._id){
                    //lx = player.x;
                    //ly = player.y;
                    color = "darkgreen";
                    //let v1 = p.createVector(lx + player.dir.x,ly + player.dir.y);
                }
                for(let bullet of tank.bullets){
                    p.push()
                    p.translate(bullet.x,bullet.y);
                    p.fill("yellow")
                    p.rect(0,0,5,5);
                    p.pop()
                }
                p.push()
                p.translate(lx,ly);
                p.rotate(r)
                p.fill(color)      
                p.rect(0,0,tank.width,tank.height)
                p.pop()
                
                p.push()
                p.translate(lx,ly);
                p.rotate(r)
                p.fill(color) 
                p.rect(10,0,30,10);
                p.pop();

                p.push()
                p.translate(lx,ly);
                p.rotate(r)
                p.fill("black")
                p.rect(0,15,30,10);
                p.rect(0,-15,30,10);
                p.pop()

                
            }
        }
    } 
    useEffect(() => {
        

    },[])
    return(
        <div ref={ref => canvas.current = ref}>

        </div>
    )
}