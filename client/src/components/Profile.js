import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom"
import { getUserById } from "../api/join";

export function Profile(props){
    const {id} = useParams();
    const [user,setUser] = useState();
    useEffect(() => {
        getUserById(id,(err,data) => {
            if(err) return console.error(err);
            setUser(data);
        })
    },[id])
    return(
        <Container>
            <Row>
                <Col className="mx-auto" xs="auto">
                <div id="user-frame">
                <i style={{color:user ? user.avatar_color : ""}} class="fas fa-user"></i>
                <h3>{user ? user.name : ""}</h3>
                </div>
                {
                    props.user.user && (id === props.user.user._id) ? 
                    <Button href="/edit" variant="dark"><i class="fas fa-user-cog"></i> Edit Profile</Button>
                    :
                    <Button variant="secondary">Follow</Button>
                }
                </Col>
                <Col>
                <div id="post-section">
                <h2>Activities</h2>
                </div>
                </Col>
            </Row>
        </Container>
    )
}