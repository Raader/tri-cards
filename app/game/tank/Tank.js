const Player = require("./Player")
const Barrier = require("./Barrier");
const Bullet = require("./Bullet");
const random = require("better-random");
const Game = require("../Game");

class TankGame extends Game{
    tanks = [];
    
    actions = {};
    map = {
        width:500,
        height:450,
    }
    borderThickness = 15;
    barriers = [
        new Barrier(100,0,30,375),
        new Barrier(this.map.width - 30 - 100,75,30,375),
        new Barrier(245,75,125,25),
        new Barrier(130,350,125,25),
        new Barrier(0,0,15,this.map.height),
        new Barrier(this.map.width - this.borderThickness,0,this.borderThickness,this.map.height),
        new Barrier(0,0,this.map.width,this.borderThickness),
        new Barrier(0,this.map.height-this.borderThickness,this.map.width,this.borderThickness),
    ];
    getInfo = () => {
        return {map:this.map};
    }

    collides(point,area){
        return area.x <= point.x && point.x <= area.x + area.width && area.y <= point.y && point.y <= area.y + area.height;
    }

    intersects(area1,area2){
        const x = area1.x
        const y = area1.y
        const width = area1.width;
        const height = area1.height;
        const corners = [
            {x: x,y: y},
            {x: x + width ,y: y },
            {x: x + width,y: y + height},
            {x: x ,y: y + height},
        ]
        for(let corner of corners){
            if(this.collides(corner,area2)){
                return true;
            }
        }
        return false;
    }
    collidesWithBarriers(point){
        for(let barrier of this.barriers){
            if(this.collides(point,barrier)){
                return true;
            }
        }
        return false;
    }

    start = (cb,deathcb,onUsers) => {
        this.loop = setInterval(() => cb(this.update(deathcb)),33);
        this.onUsers = onUsers;
    }

    randomPoint(){
        const x = random.randInt(0,this.map.width)
        const y = random.randInt(0,this.map.height)
        while(this.collidesWithBarriers({x,y})){
            x = random.randInt(0,this.map.width)
            y = random.randInt(0,this.map.height)
        }
        return({x,y});
    }

    addPlayer = (user,cb) => {
        const randomcolor = require("randomcolor");
        const player = this.tanks.find((val) => val.id === user.id);
        if(player) return;
        this.tanks.push(new Player(user.id,user.name,0,0,20,20,randomcolor()))
        cb({info:this.getInfo(),gameState:this.update()});
    }

    removePlayer = (id,cb) => {
        this.tanks.splice(this.tanks.indexOf(this.tanks.find((val) => val.id === id)),1);
        if(cb) cb();
    }

    fire = (id) => {
        const tank = this.tanks.find((val) => val.id === id);
        if(!tank || tank.onCooldown) return;
        tank.actions.fire = () => {
        const x = tank.x + tank.dir.x * tank.width/2;
        const y = tank.y + tank.dir.y * tank.height/2;
        const bullet = new Bullet(x,y,7,7,tank.dir,10);
        tank.bullets.push(bullet);
        tank.onCooldown = true;
        //setTimeout(() => tank.bullets.splice(tank.bullets.indexOf(bullet),1),10000)
        setTimeout(() => tank.onCooldown = false,1000);
        }
    }
    updateUsers = () => {
        if(this.onUsers) this.onUsers(this.tanks.map(val => ({user:{id:val.id}, score:val.killCount,dead:val.dead})))
    }

    updatePlayer = (id,input) => {
        const player = this.tanks.find((val) => val.id === id);
        if(!player || player.dead) return;
        player.x = input.x;
        player.y = input.y;
        player.dir = input.dir;
        return;
        player.actions.move = () =>{
        const{oldx,oldy} = player.calculateMovement(input.uKey,input.dKey,input.rKey,input.lKey);
        const map = this.map;
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
        for(let barrier of this.barriers){
            if(this.intersects(player.getArea(),barrier.getArea())){
                player.x = oldx;
                player.y = oldy;
                break;
            }
        }
        }
    }

    update = (deathcb) => {
        const tanks = this.tanks;
        const barriers = this.barriers;
        const ts = [];
        for(let p of tanks){
            for(let action of Object.values(p.actions)){
                if(action) action();
            }
            for(let f= 0; f < p.bullets.length;f++){
                const bullet = p.bullets[f];
                bullet.calculateMovement();
                for(let b of barriers){
                    if(this.collides(bullet,b)){
                        p.bullets.splice(f,1);
                        break;
                    }
                }
                for(let i=0;i < tanks.length; i++){
                    const t = tanks[i];
                    if(t !== p && this.intersects(bullet.getArea(),t.getArea())){
                        p.bullets.splice(f,1);
                        p.killCount += 1;
                        t.dead = true;
                        this.updateUsers();
                        if(deathcb) deathcb(t.id);
                        setTimeout(() => {
                            t.dead = false
                        },5000)
                        break
                    }
                }
            }
            p.actions = {};
            ts.push(p.getData())
        }
        const bs = [];
        for(let b of barriers){
            bs.push(b.getData())
        }
        const gameState = {
            tanks:ts,barriers:bs
        }
        return gameState;
    }
}
module.exports.game = TankGame;