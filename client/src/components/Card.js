import { Col, Container, Row } from "react-bootstrap"
import "../sheets/Card.css";

export function GameCard(props){
    return(
        <div id="card">
            <Container fluid>
                <Row>
                    <Col className="mx-auto" id="portrait-col">
                    <div id="card-portrait">
                        <img className="portrait" src={props.portrait} alt="card"></img>
                    </div>
                    </Col>
                </Row>
                <Row id="card-name-row">
                    <Col>
                    <div id="card-name">
                        {props.name}
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col id="card-stats-col">
                    <div id="card-stats">
                    <p className="card-stat">pow: <span id="pow-stat">{props.power}</span></p>
                    <p className="card-stat">end: <span id="end-stat">{props.endurance}</span></p>
                    <p className="card-stat">spd: <span id="spd-stat">{props.speed}</span></p>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}