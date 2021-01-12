import { token } from "./join";

function editColor(color,cb){
    const options = {
        method:"POST",
        headers: {    
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token      
        },
        body:JSON.stringify({color:color})
    }
    fetch("/api/profiles/edit/color",options)
    .then(res => res.json())
    .then(data => {
        if(!data.color) throw data.msg;
        cb(null,data);
    })
    .catch(err => {
        cb(err);
    })
}

function editStatus(status,cb){
    const options = {
        method:"POST",
        headers: {    
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token      
        },
        body:JSON.stringify({status:status})
    }
    fetch("/api/profiles/edit/status",options)
    .then(res => res.json())
    .then(data => {
        if(!data.status) throw data.msg;
        cb(null,data);
    })
    .catch(err => {
        cb(err);
    })
}

export {editColor, editStatus}