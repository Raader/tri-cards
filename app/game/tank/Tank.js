const Player = require("./Player")
const Barrier = require("./Barrier");
const tanks = []
const barriers = [
    new Barrier(100,50,50,300)
]

function addTank(id){
    const player = tanks.find((val) => val.id === id);
    if(player) return;
    tanks.push(new Player(id,0,0,25,25))
}
function removeTank(id){
    tanks.splice(tanks.indexOf(tanks.find((val) => val.id === id)),1);
}
function moveTank(id,input){
    const player = tanks.find((val) => val.id === id);
    if(!player || player.dead) return;
    const{oldx,oldy} = player.calculateMovement(input.uKey,input.dKey,input.rKey,input.lKey);
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
function update(){
    const ts = [];
    for(let p of tanks){
        ts.push({x:p.x,y:p.y,width:p.width,height:p.height,dead:p.dead,dir:p.dir,bullets:[]})
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