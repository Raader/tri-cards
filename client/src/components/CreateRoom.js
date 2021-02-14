import { useRef, useState } from "react";
import { Modal,Form, Button } from "react-bootstrap";

export function CreateRoom(props) {
    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);
    const name = useRef();
    const game = useRef();
    return (
        <Modal className="create-room" show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Room Name</Form.Label>
                <Form.Control type="text" ref={ref => name.current = ref} placeholder="Awesome Room #1"/>
                <Form.Label>Game</Form.Label>
                <Form.Control as="select" ref={ref => game.current = ref}>
                    <option>tank</option>
                    <option>snake</option>
                </Form.Control>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="stylish" onClick={() => props.create(name.current.value,game.current.value)}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}