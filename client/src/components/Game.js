import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import "../sheets/Game.css";

export function Game() {
    const game = useGame()
    const history = useHistory();
    return (
        <Container id="game">
            <Row>
                <Col sm="4">
                    <div id="user-list">
                        <h2>Users</h2>
                        <div id="users">
                        {game.userList.map((user) => <div className="list-user" onClick={() => window.location.pathname = "users/" + user.id}>
                            <p><i class="fas fa-user"></i> {user.name}</p>
                        </div>)}
                        </div>
                    </div>
                </Col>
                <Col>
                    <div id="room-list">
                        <h2>Rooms <span><Button variant="secondary" onClick={() => game.createRoom("yarra",(err,room) => {
                            if(err) return console.error(err);
                            history.push("/room/" + room.id)
                        })}>Create Room</Button></span></h2>
                        
                        <div id="rooms">
                        {game.roomList.map(room => (<div className="list-room" onClick={() => history.push("/room/" + room.id)}>
                            <p>{room.name}</p></div>))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}