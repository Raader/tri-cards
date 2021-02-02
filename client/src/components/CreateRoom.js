import { useRef, useState } from "react";
import { Modal,Form, Button } from "react-bootstrap";

export function CreateRoom(props) {
    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);
    const name = useRef();
    return (
        <Modal id="create-room" show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type="text" ref={ref => name.current = ref} placeholder="Room Name"/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.create(name.current.value)}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}