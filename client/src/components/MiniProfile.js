import { Container,Row,Col, ProgressBar } from "react-bootstrap";
import avatar from "../icons/user.png"

export function MiniProfile(props){
    return (
        <Container className="mini-profile" fluid>
            <Row>
                <Col xs="auto" className="mx-auto">
                <div className="avatar-portrait">
                    <img src={avatar} alt="avatar"></img>
                </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div className="profile-name">{props.user.user ? props.user.user.name : ""}</div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div className="status-msg">{props.user.user ? props.user.user.status_msg : ""}</div>
                </Col>
            </Row>
            <Row className="follow-row">
                <Col>
                <div className="follow-count">
                    <p>10</p>
                    <p>following</p>
                </div>
                </Col>
                <Col>
                <div className="follow-count">
                    <p>7</p>
                    <p>followers</p>
                </div>
                </Col>
            </Row>
            
            <Row>
                <Col>
                <div className="xp-bar">
                <div>LvL 5</div>
                <ProgressBar variant="xp" now={50} label="100/200xp"></ProgressBar>
                </div>
                </Col>
            </Row>
        </Container>    
    )
}