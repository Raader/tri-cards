import { set } from "mongoose";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import "../sheets/Game.css";
import { ProfileColumn } from "./ProfileColumn";
import { RoomsColumn } from "./RoomsColumn";
import { UsersColumn } from "./UsersColumn";

export function Game(props) {
    const game = useGame()
    const history = useHistory();
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
            <Row>
                <Col sm="2" id="prof-col">
                <ProfileColumn user={props.user}></ProfileColumn>
                </Col>
                <Col className="no-padding">
                    <RoomsColumn game={game}></RoomsColumn>
                </Col>
                <Col sm="2" className="no-padding">
                    <UsersColumn userList={game.userList}></UsersColumn>
                </Col>
            </Row>
        </Container>
    )
}