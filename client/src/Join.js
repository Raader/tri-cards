import { useRef } from "react";
import { Container, Form, Button,Row,Col } from "react-bootstrap";
import { register } from "./api/join";
export function Join() {
    const name = useRef();
    const email = useRef();
    const password = useRef();

    function onJoin(){
        register(name.current.value,email.current.value,password.current.value,(err,val)=>{
            if(err) return console.error(err);
            console.log(val);
        })
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
            </Form>
            </Col>
            </Row>
        </Container>
    )
}