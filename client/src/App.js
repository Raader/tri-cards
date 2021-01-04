import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { About } from "./About"
import { Home } from './Home';
import { Join } from './Join';
import { Login } from './Login';
import { Game } from './Game';
import { SocketClient } from './api/socket';
import { NavMenu } from './NavMenu';
import { useUser } from './useUser';
function App() {
  const user = useUser()
  return (
    <Router>
    <div className="App">
      <NavMenu user={user}></NavMenu>
      <Switch>
        <Route path="/about">
            <About></About>
        </Route>
        <Route path="/join">
          <Join user={user}></Join>
        </Route>
        <Route path="/login">
          <Login user={user}></Login>
        </Route>
        <Route path="/game">
          <SocketClient></SocketClient>
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
