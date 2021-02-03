import { useEffect, useRef } from "react";
import { Button, Row, Col, Container, FormControl, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { edit } from "../api/edit";
import "../sheets/EditProfile.css"
export function EditProfile(props) {
    const color = useRef();
    const status = useRef();
    const history = useHistory();

    useEffect(() => {
        if(color.current && props.user.user){
            color.current.value = props.user.user.avatar_color;
        }
        if(status.current && props.user.user){
            status.current.value = props.user.user.status_msg;
        }
    },[color,status,props.user.user])

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
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Status Message</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl ref={(ref) => status.current = ref} style={{ width: "20rem" }} aria-label="status-message" aria-describedby="basic-addon2"></FormControl>
                    </InputGroup>
                    <Button id="apply-btn" variant="classic" onClick={() => {
                        const edits = {
                            avatar_color: color.current.value,
                            status_msg: status.current.value
                        }
                        const filtered = {}
                        for(let key of Object.keys(edits)){
                            if(edits[key]){
                                filtered[key] = edits[key]
                            }
                        }
                        edit(filtered,(err,data) => {
                            if(err) console.error(err);
                            history.push("/users/" + data.user._id)
                        }) 
                    }}>Apply</Button>
                </Col>
            </Row>
        </Container>
    )
}