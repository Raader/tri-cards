import { set } from "mongoose";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import "../sheets/Game.css";
import { CreateRoom } from "./CreateRoom";
import { ProfileColumn } from "./ProfileColumn";

export function Game(props) {
    const game = useGame()
    const history = useHistory();
    const [show,setShow] = useState(false)
    return (
        <Container id="game" fluid>
            <CreateRoom show={show} setShow={setShow} create={
                (name,g) => game.createRoom(name,g,(err,room) => {
                            if(err) return console.error(err);
                            history.push("/room/" + room.id);
                            })
                }></CreateRoom>
            <Row>
                <Col sm="3" id="prof-col">
                <ProfileColumn user={props.user}></ProfileColumn>
                </Col>
                <Col className="no-padding">
                    <div id="room-list">
                        <h2>Rooms <span><Button variant="stylish" onClick={() =>
                        {
                        setShow(true);
                        }}>Create Room</Button></span></h2>
                        
                        <div id="rooms">
                        {game.roomList.map(room => !room.started ?
                        <div className="list-room" onClick={() => history.push("/room/" + room.id)}><p>{room.name}</p></div>
                        :
                        <div className="list-room started-room"><p>{room.name}</p></div>  
                        )}
                        </div>
                    </div>
                </Col>
                <Col sm="2" className="no-padding">
                    <div id="user-list">
                        <h2>Users</h2>
                        <div id="users">
                        {game.userList.map((user) => <div className="list-user" onClick={() => window.location.pathname = "users/" + user.id}>
                            <p><i class="fas fa-user"></i> {user.name}</p>
                        </div>)}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}