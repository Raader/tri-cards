import { useRef } from "react";
import { Container, Form, Button,Row,Col } from "react-bootstrap";
import { login } from "./api/join";
export function Login() {
    const email = useRef();
    const password = useRef();
    function onLogin(){
        login(email.current.value,password.current.value,(err, token) =>{
            if(err) return console.error(err);
            console.log(token);
        })
    }
    return (
        <Container>
            <Row>
            <Col className="mx-auto" lg="auto">
            <p>Don't have an account? <a href="/join">Sign up!</a></p>
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
            </Form>
            </Col>
            </Row>
        </Container>
    )
}