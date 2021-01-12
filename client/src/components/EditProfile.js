import { useEffect, useRef, useState } from "react";
import { Button, Row, Col, Container, FormControl, InputGroup } from "react-bootstrap";
import { editColor } from "../api/edit";
import "./EditProfile.css"
export function EditProfile(props) {
    const color = useRef();

    useEffect(() => {
        if(color.current && props.user.user){
            color.current.value = props.user.user.avatar_color;
        }
    },[color,props.user.user])

    return (
        <Container id="edit-profile" sm="md">
            <Row>
                <Col className="mx-auto">
                    <h2><i class="fas fa-user-cog"></i> Edit Profile </h2>
                </Col>
            </Row>
            <Row>
                <Col className="mx-auto" sm="auto">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Avatar Color</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl ref={(ref) => color.current = ref} style={{ width: "10rem" }} type="color" aria-label="avatar-color" aria-describedby="basic-addon2"></FormControl>
                    </InputGroup>
                    <Button id="apply-btn" variant="dark" onClick={() => {
                        console.log(color.current.value)
                        editColor(color.current.value, (err,data) => {
                            if(err) return console.error(err);
                            window.location.pathname = "/users/" + data.user._id;
                        })
                    }}>Apply</Button>
                </Col>
            </Row>
        </Container>
    )
}