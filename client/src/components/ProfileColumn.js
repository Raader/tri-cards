import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { MiniProfile } from "./MiniProfile";
import "../sheets/ProfileColumn.css"

export function ProfileColumn(props) {
    return(
        <Container fluid id="profile-column">
            <Row>
                <Col>
                <MiniProfile user={props.user}></MiniProfile>
                </Col>
            </Row>
            <Row className="profile-btns-row">
                <Col xs="auto">
                <div className="profile-btns">
                    <div>
                    <Button variant="profile" className="hover-blue"><i class="fas fa-user"></i> Profile</Button>
                    </div>
                    <div>
                    <Button variant="profile" className="hover-yellow"><i class="fas fa-user-edit"></i> Edit</Button>
                    </div>
                    <div>
                    <Button variant="profile"className="hover-green"><i class="fas fa-trophy"></i> Achivements</Button>
                    </div>
                </div>
                </Col>
            </Row>
            <Row>
                <Col>
                
                </Col>
            </Row>
        </Container>
    )
}