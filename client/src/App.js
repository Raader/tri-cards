import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { About } from "./components/About"
import { Home } from './components/Home';
import { Join } from './components/Join';
import { Login } from './components/Login';
import { Game } from './components/Game';
import { SocketClient } from './api/socket';
import { NavMenu } from './components/NavMenu';
import { useUser } from './hooks/useUser';
import { Profile } from './components/Profile';
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
        <Route path="/users/:id">
          <Profile></Profile>
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
