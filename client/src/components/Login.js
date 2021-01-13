import { useRef, useState } from "react";
import { Container, Form, Button,Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {ErrorMessage} from "./ErrorMessage";
export function Login(props) {
    const email = useRef();
    const password = useRef();
    const [msg,setMsg] = useState("");
    function onLogin(){
        props.user.login(email.current.value,password.current.value,(err,user) => {
            if(err) setMsg(err.toString());
        });
    }
    return (
        <Container>
            <Row>
            <Col className="mx-auto" lg="auto">
            <p>Don't have an account? <Link to="/join">Sign up!</Link></p>
            <Form id="join-form" variant="dark">            
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={ref => email.current = ref} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={ref => password.current = ref} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={onLogin} variant="primary">
                    Login
                </Button>
                <ErrorMessage msg={msg}></ErrorMessage>
            </Form>
            
            </Col>
            </Row>
        </Container>
    )
}