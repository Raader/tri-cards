import { Container, Tab, Tabs } from "react-bootstrap";
import "../sheets/UsersColumn.css"
export function UsersColumn(props) {
    return (
        <Container fluid className="users-column">
            <Tabs defaultActiveKey="game">
                <Tab eventKey="game" title="Game">
                <div id="user-list">
                <div id="users">
                    {props.userList.map((user) => <div className="list-user" onClick={() => window.location.pathname = "users/" + user.id}>
                        <p><i class="fas fa-user"></i> {user.name}</p>
                    </div>)}
                </div>
                <div className="users-footer">
                <div className="online-count">{props.userList ? props.userList.length : 0} users online</div>
                <div className="playing-count">{props.userList ? props.userList.length : 0} users playing</div>
                </div>
                </div>
                </Tab>
                <Tab eventKey="friend" title="Friends">

                </Tab>

            </Tabs>
            
        </Container>
    )
}