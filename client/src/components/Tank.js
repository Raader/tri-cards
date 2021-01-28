import { useEffect, useRef, useState } from "react"
import { Player } from "../game/Player";
import { user } from "../api/join";
import { socket } from "../api/socket";
import { joinTank, subToDeath, subToGameState, tankUpdate } from "../api/tank";
import { collides, intersects } from "../game/Physics";
import { Button, Col, Container, Row } from "react-bootstrap";
import random from "better-random";
const p5 = require("p5");

export function Tank(props) {
    const canvas = useRef();
    let i = null
    const [players, setPlayers] = useState([]);
    let gameState = {};
    let p = useRef();
    let player;
    function collidesWithBarriers(area){
        for(let barrier of gameState.barriers){
            if(intersects(area,barrier)){
                return true;
            }
        }
        return false;
    }
    const randomPoint = (area) =>{
        area.x = random.randInt(0,i.map.width)
        area.y = random.randInt(0,i.map.height)
        while(collidesWithBarriers(area.getArea())){
            area.x = random.randInt(0,i.map.width)
            area.y = random.randInt(0,i.map.height)
        }
    }

    useEffect(() => {
        console.log("socket: ", socket)
        subToGameState((err, state) => {
            gameState = state;
            setPlayers(gameState.tanks.map(val => ({ name: val.name, id: val.id, killCount: val.killCount })))
        });
        joinTank((err, state) => {
            console.log(state);
            i = state.info;
            gameState = state.gameState;
            player = new Player("", "", 163, 183, 20, 20);
            randomPoint(player);          
            p.current = new p5(sketch, canvas.current);
        });
    }, [])

    const sketch = (p) => {
        subToDeath((err) => {
            randomPoint(player);
            tankUpdate({ x: player.x, y: player.y, dir: player.dir });
        })
        p.setup = () => {
            p.createCanvas(i.map.width, i.map.height);
            p.rectMode(p.CENTER);
            setInterval(() => {
                const input = { uKey: p.keyIsDown(87), dKey: p.keyIsDown(83), rKey: p.keyIsDown(68), lKey: p.keyIsDown(65) };
                tankUpdate({ x: player.x, y: player.y, dir: player.dir });
            }, 33)
        }
        p.keyPressed = () => {
            if (p.keyCode === 32) {
                socket.emit("fireBullet");
            }
        }
        p.draw = () => {
            if (!gameState.tanks) return;
            //x = p.mouseX;
            //y = p.mouseY
            const tank = gameState.tanks.find((val) => user && val.id === user._id);
            if(player && tank && !tank.dead){
            const { oldx, oldy } = player.calculateMovement(p.keyIsDown(87), p.keyIsDown(83), p.keyIsDown(68), p.keyIsDown(65))
            const map = i.map;
            if (player.x > map.width - player.width / 2) {
                player.x = map.width - player.width / 2;
            }
            if (player.x < player.width / 2) {
                player.x = player.width / 2;
            }
            if (player.y < player.height / 2) {
                player.y = player.width / 2;
            }
            if (player.y > map.height - player.height / 2) {
                player.y = map.height - player.width / 2;
            }
            for (let barrier of gameState.barriers) {
                if (intersects(player.getArea(), barrier)) {
                    player.x = oldx;
                    player.y = oldy;
                    break;
                }
            }
            }
            p.background("Moccasin")
            for (let barrier of gameState.barriers) {
                p.push()
                p.fill("burlywood")
                p.strokeWeight(3)
                p.stroke("#CDAA7D")
                p.rectMode(p.CORNER)
                p.rect(barrier.x, barrier.y, barrier.width, barrier.height);
                p.pop();
            }
            for (let tank of gameState.tanks) {
                if (tank.dead) {
                    continue;
                }
                let lx = tank.x;
                let ly = tank.y;
                let color = tank.color;
                let r = 0;
                let v1 = p.createVector(tank.dir.x, tank.dir.y);
                let heading = v1.heading();
                r = heading.toFixed(2);
                if (user && tank.id === user._id) {
                    lx = player.x;
                    ly = player.y;
                    let v1 = p.createVector(player.dir.x, player.dir.y);
                    let heading = v1.heading();
                    r = heading.toFixed(2);
                    //let v1 = p.createVector(lx + player.dir.x,ly + player.dir.y);
                }
                for (let bullet of tank.bullets) {
                    p.push()
                    p.translate(bullet.x, bullet.y);
                    p.fill("yellow")
                    p.rect(0, 0, bullet.width, bullet.height);
                    p.pop()
                }
                
                p.push()
                p.translate(lx, ly);
                p.rotate(r)
                p.fill(color)
                p.rect(0, 0, tank.width, tank.height)
                p.pop()

                p.push()
                p.translate(lx, ly);
                p.rotate(r)
                p.fill(color)
                p.rect(8, 0, 23, 8);
                p.pop();

                p.push()
                p.translate(lx, ly);
                p.rotate(r)
                p.stroke("#494A4A")
                p.fill("#595A5A")
                p.rect(0, tank.height/2 + 2.5, 25, 8);
                p.rect(0, -tank.height/2 -2.5, 25, 8);
                p.pop()

                p.push()
                p.textSize(20);
                p.textAlign(p.CENTER)
                p.fill("white")
                p.text(tank.name, lx, ly + tank.height * 1.5);
                p.pop()


            }
        }
    }
    useEffect(() => {


    }, [])
    return (
        <Container>
            <Row>
                <Col>
                    <div id="tank-area" ref={ref => canvas.current = ref}>

                    </div>
                </Col>
                <Col>
                    <div>
                        {players.map(val => <h1>{`${val.name}: ${val.killCount}`}</h1>)}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}