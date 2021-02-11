import { Container, Row, Col } from "react-bootstrap";
import { Snake } from "./Snake";
import { Tank } from "./Tank";
import "../sheets/Play.css"
import { useEffect, useState } from "react";
import { Fragment } from "react";
export function Play(props){
    function renderGame(){
        if(props.game === "tank"){
            return <Tank></Tank>
        }
        else if(props.game === "snake"){
            return <Snake></Snake>
        }
        else{
            return <Fragment></Fragment>
        }
    }
    return(
        <Container fluid>
            <Row>
                <Col className="play-col">
                    <div className="play-div">
                        <h2>Users</h2>
                        <div id="users-div">
                        {props.users.map((user) => 
                        <Fragment>
                        <div className="room-user">
                            <Container>
                                <Row style={{color:user.color? user.color : "black"}}>
                                    <Col className="username-col" >
                                    <p style={user.dead ? {color:"#619397"} : {}}><i class="fas fa-user"></i> {user.name} </p>
                                    </Col>
                                    <Col xs="auto" style={user.dead ? {color:"#619397"} : {}}>
                                    {user.score ? user.score : "0"}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        </Fragment>)}
                        </div>
                    </div>
                </Col>
                <Col className="main-col mx-auto">
                {renderGame()}
                </Col>
                <Col className="play-col">
                    <div className="play-div">
                        <h2>How To Play</h2>
                        <div id="howto-div">

                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}