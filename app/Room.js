const Snake = require("./game/snake/Snake");

class Room{
    users = [];
    owner;

    constructor(name,id,owner,onUsers,removeRoom){
        this.name = name;
        this.id = id;
        this.owner = owner;
        this.onUsers = onUsers;
        this.removeRoom = removeRoom;
        this.game = new Snake();
    }

    updateUsers = () => {
        if(this.users.length <= 0) {
            return this.removeRoom();
        }
        const list = this.users.map((val) => ({name:val.user.name,_id:val.user.name}));
        this.onUsers(list);
    }

    addUser = (socket,cb) => {
        const u = this.users.find((val) => val.user.id === socket.user.id);
        if(u) return;
        this.users.push(socket);
        cb(socket.user.id === this.owner.id);
        this.updateUsers()
    } 

    removeUser = (socket,cb) => {
        const u = this.users.find((val) => val.user.id === socket.user.id);
        this.users.splice(this.users.indexOf(u),1);
        cb();
        this.updateUsers()
    }

    startGame = (socket) => {
        if(socket.user.id === this.owner.id){
            console.log("start")
            for(let user of this.users){
                user.emit("startGame","snake");
            }
        }
    }

}

module.exports = Room;