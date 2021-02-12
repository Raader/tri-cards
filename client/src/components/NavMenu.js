import { Fragment, useEffect, useState } from "react";
import { Nav, Navbar, Badge, NavDropdown } from "react-bootstrap";
import { Link,NavLink, useHistory } from "react-router-dom";
import "../sheets/Navbar.css"
export function NavMenu(props) {
    const [user,setUser] = useState();
    const history = useHistory();
    const [radio,setRadio] = useState(0);
    useEffect(() =>{
        setUser(props.user.user);
    },[user,props.user.user])
    return (
        <Navbar id="nav-main" expand="lg" sticky="top">
            <Navbar.Brand id="h-main" href="#"><span><i class="fas fa-gamepad"></i></span>Tricards</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" id="main-nav">
                    <Nav.Link className={"nav-link" + (radio === 0 ? " a-nav-link" : "")} onClick={() => {history.push("/");setRadio(0)}}><i class="fas fa-home"></i> Home</Nav.Link>
                    <Nav.Link className={"nav-link" + (radio === 1 ? " a-nav-link" : "")}  onClick={() => {history.push("/about");setRadio(1)}}><i class="fas fa-home"></i> About</Nav.Link>
                    <Nav.Link className={"nav-link" + (radio === 2 ? " a-nav-link" : "")}  onClick={() => {history.push("/game");setRadio(2)}}><i class="fas fa-gamepad"></i> Game <Badge variant="secondary">FREE</Badge></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    {user ?  
                    <NavDropdown title={user.name} id="user-dropdown">
                        <NavDropdown.Item className="user-drop" onClick={() => history.push("/users/" + user._id)} id="profile-button" >Profile</NavDropdown.Item>
                        <NavDropdown.Item className="user-drop" onClick={props.user.logout} id="logout" >Logout</NavDropdown.Item>
                    </NavDropdown>
                    :
                    <Fragment>
                        <Nav.Link onClick={() => history.push("/login")}>Login /</Nav.Link>
                        <Nav.Link onClick={() => history.push("/login")}>Sign Up</Nav.Link>
                    </Fragment>

                    }
                    <Nav.Link id="github-link"><i class="fab fa-github"></i> Github</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}