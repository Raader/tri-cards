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
import { EditProfile } from './components/EditProfile';
import { Room } from './components/Room';
import { Cards } from './components/Cards';
import { useEffect } from 'react';
function App() {
  const user = useUser()

  useEffect(() => {
    document.body.style.backgroundColor = "SlateGray"
  },[])
  return (
    <Router>
    <div className="App">
      <NavMenu user={user}></NavMenu>
      <SocketClient></SocketClient>
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

          <Game></Game>
        </Route>
        <Route path="/users/:id">
          <Profile user={user}></Profile>
        </Route>
        <Route path="/edit">
          <EditProfile user={user}></EditProfile>
        </Route>
        <Route path="/room/:id">
          
          <Room></Room>
        </Route>
        <Route path="/cards">
          <Cards></Cards>
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
