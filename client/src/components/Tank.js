import { useEffect, useRef, useState } from "react"
import { user } from "../api/join";
import { socket } from "../api/socket";
const p5 = require("p5");

class Barrier{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    contains = function(x,y){
        return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
    }
}

class Player{
    speed = 2.5;
    dir = {x:0,y:0}
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    calculateDir = (uKey,dKey,rKey,lKey) => {
        const dir= {x:0,y:0}
        if(rKey){
            dir.x += 1;
        }
        if(lKey){
            dir.x += -1;
        }
        if(uKey){
            dir.y += -1;
        }
        if(dKey){
            dir.y += 1;
        }
        if(dir.x && dir.y){
            dir.x /= 2;
            dir.y /= 2;
        }
        return dir;
    }
    calculateMovement = (uKey,dKey,rKey,lKey) => {
        const oldx = this.x;
        const oldy = this.y;
        const dir = this.calculateDir(uKey,dKey,rKey,lKey);
        if(!dir.x && !dir.y) return {oldx:0,oldy:0};
        this.dir = dir;
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
        return {oldx,oldy}
    }
}
export function Tank(props){
    const canvas = useRef();
    let gameState = {};
    let p = useRef();
    useEffect(() => {
        socket.on("tankUpdate",(state) => {
            gameState = state;
        });
        socket.emit("joinTank");
    },[])

    const sketch = (p) => {
        const player = new Player(0,0,25,25);
        let barriers = []
        p.setup = () => {
            p.createCanvas(400, 400);
            p.rectMode(p.CENTER);
            setInterval(() => {
                socket.emit("tankUpdate",{x: player.x,y: player.y,dir:player.dir})
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
            //y = p.mouseY;
            
            const {oldx,oldy} = player.calculateMovement(p.keyIsDown(87),p.keyIsDown(83),p.keyIsDown(68),p.keyIsDown(65));
            if(player.x > 400-player.width/2){
                player.x = 400-player.width/2;
            }
            if(player.x < player.width/2){
                player.x = player.width/2;
            }
            if(player.y < player.height/2){
               player.y= player.width/2;
            }
            if(player.y> 400- player.height/2){
                player.y = 400- player.width/2;
            }
            
            p.background("lightblue")
            barriers = [];
            for(let b of gameState.barriers){
                barriers.push(new Barrier(b.x,b.y,b.width,b.height));
            }
            for(let barrier of barriers){
                const width = player.width;
                const height = player.height;
                const x = player.x
                const y = player.y
                const corners = [
                    {x: x + width/2,y: y + height/2},
                    {x: x - width/2,y: y - height/2},
                    {x: x + width/2,y: y - height/2},
                    {x: x - width/2,y: y + height/2},
                ]
                for(let corner of corners){
                    if(barrier.contains(corner.x,corner.y)){
                        player.x = oldx;
                        player.y = oldy;
                        break;
                    }
                }
                
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
                r = p.degrees(heading).toFixed(2);
                p.text("degrees: " + r,10,50,90,90);
                r = heading.toFixed(2);
                if(user && tank.id === user._id){
                    //lx = player.x;
                    //ly = player.y;
                    color = "darkgreen";
                    //let v1 = p.createVector(lx + player.dir.x,ly + player.dir.y);
                    let v1 = p.createVector(player.dir.x,player.dir.y);
                    let heading = v1.heading();
                    r = p.degrees(heading).toFixed(2);
                    p.text("degrees: " + r,10,50,90,90);
                    r = heading.toFixed(2)
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
                p.rect(0,0,player.width,player.height)
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
        p.current = new p5(sketch, canvas.current);

    },[])
    return(
        <div ref={ref => canvas.current = ref}>

        </div>
    )
}