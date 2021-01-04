let token = localStorage.getItem("token");
let user = null;

function login(email,password,cb){
    if(!email || !password) return cb("no email or password");
    const options = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',          
        },
        body:JSON.stringify({user:{email:email,password:password}})
    }
    fetch("/api/users/login",options)
    .then(res => res.json())
    .then(data => {
        user = data.user
        token = data.token;
        localStorage.setItem("token",token)
        cb(null,data);
    })
    .catch(err => {
        cb(err);
    })
}

function register(name,email,password,cb){
    if(!name || !email || !password) return cb("no email or password");
    const options = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',          
        },
        body:JSON.stringify({user:{name:name,email:email,password:password}})
    }
    fetch("/api/users/register",options)
    .then(res => res.json())
    .then(data => {
        user = data.user
        token = data.token;
        localStorage.setItem("token",token)
        cb(null,data);
    })
    .catch(err => {
        cb(err);
    })
}

function getUser(token,cb){
    const options = {
        method:"GET",
        headers: {    
            "Authorization": "Bearer " + token      
        },
    }
    return fetch("/api/users",options)
    .then(res => res.json())
    .then(data => {
        user = data.user
        cb(null,data)
    })
    .catch(err=>{
        cb(err);
    })
}

export {token ,user, login, register,getUser}