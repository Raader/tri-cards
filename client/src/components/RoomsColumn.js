import { Container,Button, } from "react-bootstrap";

export function RoomsColumns() {
    return (
        <Container fluid>
            <div id="room-list">
                <h2>Rooms <span><Button variant="stylish" onClick={() => {
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
        </Container>
    )
}