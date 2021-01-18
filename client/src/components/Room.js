import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { joinRoom, leaveRoom, subscribeToRoomUsers, unsubscribeFromRoomUsers } from "../api/rooms";
import "../sheets/Room.css"
export function Room(props){
    const {id} = useParams()
    const [name, setName] = useState("");
    const [users,setUsers] = useState([]);
    useEffect(() => {
        joinRoom(id,(err, room) =>{
            if(err) return console.error(err);
            setName(room.name);
        })
        return () => leaveRoom();
    },[id])

    useEffect(() => {
        subscribeToRoomUsers((err,list) => {
            if(err) return console.error(err);
            setUsers(list);
        })
        return unsubscribeFromRoomUsers;
    },[id])
    return (
        <Container id="room-ctn">
            <Row>
                <Col className="mx-auto" sm="8" id="room-users-col">
                    <div id="room-main">
                    <div id="room-name">
                        <h1>{name}</h1>
                    </div>
                    <div id="room-users">
                    {users.map((user) => 
                    <div className="room-user">
                        <p><i class="fas fa-user"></i> {user.name}</p>
                    </div>)}
                    </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="mx-auto" id="room-bottom-col">
                <div id="room-bottom">
                <p>Waiting for host to start the game</p>
                </div>
                </Col>
            </Row>
            
        </Container>
    )
}