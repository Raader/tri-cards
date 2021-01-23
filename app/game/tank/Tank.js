const Player = require("./Player")
const Barrier = require("./Barrier");
const { get } = require("config");
const tanks = []
const barriers = [
    new Barrier(100,50,50,300)
]
const map = {
    width:500,
    height:500,
}
let actions = {}


function collides(point,area){
    return area.x <= point.x && point.x <= area.x + area.width && area.y <= point.y && point.y <= area.y + area.height;
}

function getInfo(){
    return {map};
}

function addTank(id){
    const player = tanks.find((val) => val.id === id);
    if(player) return;
    tanks.push(new Player(id,0,0,25,25))
}
function removeTank(id){
    tanks.splice(tanks.indexOf(tanks.find((val) => val.id === id)),1);
}
function fire(id){
    const tank = tanks.find((val) => val.id === id);
    if(!tank || tank.onCooldown) return;
    tank.actions.fire = () => {
    tank.bullets.push({x:tank.x,y:tank.y,dir:tank.dir});
    tank.onCooldown = true;
    setTimeout(() => tank.onCooldown = false,1000);
    }
}
function moveTank(id,input){
    const player = tanks.find((val) => val.id === id);
    if(!player || player.dead) return;
    player.actions.move = () =>{
    const{oldx,oldy} = player.calculateMovement(input.uKey,input.dKey,input.rKey,input.lKey);
    if(player.x > map.width-player.width/2){
        player.x = map.width-player.width/2;
    }
    if(player.x < player.width/2){
        player.x = player.width/2;
    }
    if(player.y < player.height/2){
       player.y= player.width/2;
    }
    if(player.y> map.height- player.height/2){
        player.y = map.height- player.width/2;
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
    }
    }
}
function update(){
    const ts = [];
    for(let p of tanks){
        for(let action of Object.values(p.actions)){
            if(action) action();
        }
        for(let i= 0; i < p.bullets.length;i++){
            const bullet = p.bullets[i];
            bullet.x += bullet.dir.x * 5;
            bullet.y += bullet.dir.y * 5; 
            for(let b of barriers){
                if(collides(bullet,b)){
                    p.bullets.splice(i,1);
                    break;
                }
            }
            for(let i=0;i < tanks.length; i++){
                const t = tanks[i];
                if(t !== p && collides(bullet,t)){
                    t.dead = true;
                    p.bullets.splice(i,1);
                    setTimeout(() => {
                        t.dead = false
                    },5000)
                    break
                }
            }
        }
        p.actions = {};
        ts.push({x:p.x,y:p.y,width:p.width,height:p.height,dead:p.dead,dir:p.dir,bullets:p.bullets})
    }
    const bs = [];
    for(let b of barriers){
        bs.push({x:b.x,y:b.y,width:b.width,height:b.height})
    }
    const gameState = {
        tanks:ts,barriers:bs
    }
    return gameState;
}

module.exports.addTank = addTank;
module.exports.removeTank = removeTank;
module.exports.update = update;
module.exports.moveTank = moveTank;
module.exports.fire = fire
module.exports.getInfo = getInfo;