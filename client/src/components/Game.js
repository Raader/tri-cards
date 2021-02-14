import { set } from "mongoose";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import "../sheets/Game.css";
import { CreateRoom } from "./CreateRoom";
import { ProfileColumn } from "./ProfileColumn";
import { UsersColumn } from "./UsersColumn";

export function Game(props) {
    const game = useGame()
    const history = useHistory();
    const [show,setShow] = useState(false)
    const [test,setTest] = useState([])
    useEffect(() => {
        const t = []
        for(let i = 0; i <50; i ++){
            t.push({name:"FarukMaruk",_id:"11111"});
        }
        setTest(t);
    },[])
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
                        <h3>Rooms <span><Button variant="stylish" onClick={() =>
                        {
                        setShow(true);
                        }}>Create Room</Button></span></h3>
                        
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
                    <UsersColumn userList={game.userList}></UsersColumn>
                </Col>
            </Row>
        </Container>
    )
}