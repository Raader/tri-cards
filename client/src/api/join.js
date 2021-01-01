let token = "";

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
        token = data.token;
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
        token = data.token;
        cb(null,data);
    })
    .catch(err => {
        cb(err);
    })
}

export {token , login, register}