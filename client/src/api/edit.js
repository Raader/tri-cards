import { token } from "./join";

function edit(edits,cb){
    const options = {
        method:"POST",
        headers: {    
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token      
        },
        body:JSON.stringify({edit:edits})
    }
    fetch("/api/profiles/edit",options)
    .then(res => res.json())
    .then(data => {
        if(!data.user) throw data.msg;
        cb(null,data);
    })
    .catch(err => {
        cb(err);
    })
}

export {edit}