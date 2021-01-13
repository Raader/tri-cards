import { Fragment, useEffect, useState } from "react";
import { Nav, Navbar, Badge, NavDropdown } from "react-bootstrap";
import { Link,NavLink, useHistory } from "react-router-dom";

export function NavMenu(props) {
    const [user,setUser] = useState();
    const history = useHistory();
    useEffect(() =>{
        setUser(props.user.user);
    },[user,props.user.user])
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#"><span><i class="fas fa-gamepad"></i></span>Tricards</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" id="main-nav">
                    <Nav.Link><Link style={{textDecoration:"none",color:"lightgray"}} to="/"><i class="fas fa-home"></i> Home</Link></Nav.Link>
                    <Nav.Link><Link style={{textDecoration:"none",color:"lightgray"}} to="/about"><i class="fas fa-home"></i> About</Link></Nav.Link>
                    <Nav.Link ><Link style={{textDecoration:"none",color:"lightgray"}} to="/game"><i class="fas fa-gamepad"></i> Game <Badge variant="secondary">FREE</Badge></Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    {user ?  
                    <NavDropdown title={user.name} id="useer-dropdown">
                        <NavDropdown.Item onClick={() => history.push("/users/" + user._id)} id="profile-button" >Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={props.user.logout} id="logout" >Logout</NavDropdown.Item>
                    </NavDropdown>
                    : <Navbar.Text><a href="/login">Login</a> / <a href="/join">Sign Up</a></Navbar.Text>}
                    <Nav.Link><i class="fab fa-github"></i> Github</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}