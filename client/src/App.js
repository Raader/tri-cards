import logo from './logo.svg';
import './App.css';
import {Nav, Navbar, Badge} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { About } from "./About"
import { Home } from './Home';
import { Join } from './Join';
import { Login } from './Login';
import { Game } from './Game';
function App() {
  return (
    <Router>
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#"><span><i class="fas fa-gamepad"></i></span>Tricards</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
            <Nav.Link href="/game">Game <Badge variant="secondary">FREE</Badge></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/about">
            <About></About>
        </Route>
        <Route path="/join">
          <Join></Join>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/game">
          <Game></Game>
        </Route>
        <Route path="/">
            <Home></Home>
        </Route>
      </Switch>      
    </div>
    </Router>
  );
}

export default App;
