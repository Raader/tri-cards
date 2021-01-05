import { useRef, useState } from "react";
import { Container, Form, Button,Row,Col } from "react-bootstrap";
import { ErrorMessage } from "./ErrorMessage";
export function Join(props) {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const [msg,setMsg] = useState("")
    function onJoin(){
        props.user.register(name.current.value,email.current.value,password.current.value,(err,user) => {
            if(err) setMsg(err.toString());
        });
    }
    return (
        <Container>
            <Row>
            <Col className="mx-auto" lg="auto">
            <p>Already have an account? <a href="/login">login</a> instead.</p>
            <Form id="join-form" variant="dark">
                <Form.Group controlId="formBasicName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" ref={ref => name.current = ref} placeholder="Username"/>
                </Form.Group>               
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={ref => email.current = ref} placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={ref => password.current = ref} placeholder="Password" />
                </Form.Group>
                <Button variant="primary" onClick={onJoin}>
                    Sign Up
                </Button>
                <ErrorMessage msg={msg}></ErrorMessage>
            </Form>
            </Col>
            </Row>
        </Container>
    )
}