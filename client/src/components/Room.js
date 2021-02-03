import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { joinRoom, leaveRoom, subscribeToRoomUsers, unsubscribeFromRoomUsers } from "../api/rooms";
import "../sheets/Room.css"
import { CreateRoom } from "./CreateRoom";
export function Room(props){
    const {id} = useParams()
    const [name, setName] = useState("");
    const [users,setUsers] = useState([]);
    const [isHost,setIsHost] = useState(false);
    useEffect(() => {
        joinRoom(id,(err, room) =>{
            if(err) return console.error(err);
            setName(room.name);
            setIsHost(room.isHost);
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
                    <div id="room-bottom">
                {isHost ? 
                <Button variant="stylish">Start Game</Button>
                :
                <p>Waiting for host to start the game</p>
                }
                </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}