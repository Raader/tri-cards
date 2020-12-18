import { Container, Form, Button,Row,Col } from "react-bootstrap";
export function Join() {
    return (
        <Container>
            <Row>
            <Col className="mx-auto" lg="auto">
            <p>Already have an account? <a href="/">login</a> instead.</p>
            <Form id="join-form" variant="dark">
                <Form.Group controlId="formBasicName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Username"/>
                </Form.Group>               
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            </Col>
            </Row>
        </Container>
    )
}