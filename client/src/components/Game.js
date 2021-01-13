import { Container, Row, Col, Button } from "react-bootstrap";
import { useGame } from "../hooks/useGame";
import "../sheets/Game.css";

export function Game() {
    const game = useGame()
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
                        <Button>Create Room</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}