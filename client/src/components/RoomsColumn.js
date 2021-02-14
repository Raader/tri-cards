import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { CreateRoom } from "./CreateRoom";
import { useHistory } from "react-router-dom";
import "../sheets/RoomsColumn.css";

export function RoomsColumn(props) {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [over,setOver] = useState(false);
    const [msg,setMsg] = useState("");
    let typing = false;

    function startTyping(){
        const message = "Create Room";
        let i = 0;
        let ms = ""
        typing = true;
        function nextLetter(cb){
            if(i < message.length && typing){
                ms += message[i]
                setMsg(ms)
                i += 1;
                setTimeout(nextLetter,15)
            }
        }
        setTimeout(() => {
            nextLetter()
        },15)
    }
    return (
        <Container fluid id="rooms-column">
            <CreateRoom show={show} setShow={setShow} create={
                (name, g) => props.game.createRoom(name, g, (err, room) => {
                    if (err) return console.error(err);
                    history.push("/room/" + room.id);
                })
            }></CreateRoom>
            <Row>
                <Col>
                    <h3>Room Name</h3>
                </Col>
                <Col>
                    <h3>Game Mode</h3>
                </Col>
                <Col>
                    <h3>Players</h3>
                </Col>
                <Col>
                    <h3>Ping</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div id="room-list">
                        <div id="rooms">
                            {props.game.roomList.map(room => !room.started ?
                                <Container className="list-room" onClick={() => history.push("/room/" + room.id)}>
                                    <Row>
                                        <Col>
                                            <p>{room.name}</p>
                                        </Col>
                                        <Col>
                                            Tank
                                        </Col>
                                        <Col>
                                            5/10
                                        </Col>
                                        <Col>
                                            83ms
                                        </Col>
                                    </Row>

                                </Container>
                                :
                                <div className="list-room started-room"><p>{room.name}</p></div>
                            )}
                        </div>
                        <div className="rooms-footer">
                            <Button variant="glow" onMouseOver={() => startTyping()} onMouseOut={() => {typing = false;setMsg("")}} onClick={() => {
                                setShow(true);
                            }}>{msg ? msg : <i class="fas fa-plus"></i>}</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}