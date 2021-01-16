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
                        {game.userList.map((user) => <div className="list-user" onClick={() => window.location.pathname = "users/" + user.id}>
                            <h1>{user.name}</h1>
                        </div>)}
                    </div>
                </Col>
                <Col>
                    <div id="room-list">
                        <h2>Rooms</h2>
                        <Button onClick={() => game.createRoom("yarra",(err,room) => {
                            if(err) return console.error(err);
                            history.push("/room/" + room.id)
                        })}>Create Room</Button>
                        {game.roomList.map(room => (<div onClick={() => history.push("/room/" + room.id)}><h1>{room.name}</h1></div>))}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}