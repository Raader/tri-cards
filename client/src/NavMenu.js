import { Nav, Navbar, Badge } from "react-bootstrap";

export function NavMenu() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#"><span><i class="fas fa-gamepad"></i></span>Tricards</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/"><i class="fas fa-home"></i> Home</Nav.Link>
                    <Nav.Link href="about"><i class="fas fa-info-circle"></i> About</Nav.Link>
                    <Nav.Link href="/game"><i class="fas fa-gamepad"></i> Game <Badge variant="secondary">FREE</Badge></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <a href="/login">Login</a> / <a href="/join">Sign Up</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}