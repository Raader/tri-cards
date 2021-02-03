class Room{
    users = [];
    owner;
    constructor(name,id,owner,onUsers,removeRoom){
        this.name = name;
        this.id = id;
        this.owner = owner;
        this.onUsers = onUsers;
        this.removeRoom = removeRoom;
    }

    updateUsers = () => {
        if(this.users.length <= 0) {
            return this.removeRoom();
        }
        const list = this.users.map((val) => ({name:val.user.name,_id:val.user.name}));
        this.onUsers(list);
    }

    addUser = (user,cb) => {
        const u = this.users.find((val) => val.user.id === user.id);
        if(u) return;
        this.users.push({user});
        cb(user.id === this.owner.id);
        this.updateUsers()
    } 

    removeUser = (user,cb) => {
        const u = this.users.find((val) => val.user.id === user.id);
        this.users.splice(this.users.indexOf(u),1);
        cb();
        this.updateUsers()
    }

}

module.exports = Room;