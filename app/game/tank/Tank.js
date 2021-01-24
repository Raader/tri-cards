const Player = require("./Player")
const Barrier = require("./Barrier");
const Bullet = require("./Bullet");

class Game{
    tanks = [];
    barriers = [
        new Barrier(100,50,50,300),
        new Barrier(300,50,50,300)
    ];
    actions = {};
    map = {
        width:500,
        height:500,
    }

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

    addTank = (user) => {
        const randomcolor = require("randomcolor");
        const player = this.tanks.find((val) => val.id === user.id);
        if(player) return;
        this.tanks.push(new Player(user.id,user.name,0,0,25,25,randomcolor()))
    }

    removeTank = (id) => {
        this.tanks.splice(this.tanks.indexOf(this.tanks.find((val) => val.id === id)),1);
    }

    fire = (id) => {
        const tank = this.tanks.find((val) => val.id === id);
        if(!tank || tank.onCooldown) return;
        tank.actions.fire = () => {
        const bullet = new Bullet(tank.x,tank.y,7,7,tank.dir,10);
        tank.bullets.push(bullet);
        tank.onCooldown = true;
        setTimeout(() => tank.bullets.splice(tank.bullets.indexOf(bullet),1),10000)
        setTimeout(() => tank.onCooldown = false,1000);
        }
    }

    moveTank = (id,input) => {
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

    update = () => {
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
                        t.dead = true;
                        setTimeout(() => {
                            t.dead = false
                        },5000)
                        break
                    }
                }
            }
            p.actions = {};
            ts.push({id:p.id,name:p.name,x:p.x,y:p.y,width:p.width,height:p.height,dead:p.dead,dir:p.dir,speed:p.speed,color:p.color,
                bullets:p.bullets.map((b) => {return {x:b.x,y:b.y,width:b.width,height:b.height,dir:b.dir}})})
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
}
module.exports.game = Game;