import { Jumbotron,Button, Carousel, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../sheets/Home.css";

export function Home(){
    const history = useHistory();
    return(
        <div id="home">
            
            <Jumbotron id="main-jumbot" fluid>
                <h1 id="hey-there" >Hey There!</h1>
                <p>
                This is a simple app that let's you play minigames with your friends or strangers.
                </p>
                <p>
                It's completely free and open source.
                </p>
                <p>
                Just sign up and try tons of different minigames.
                </p>
                
                <p>
                <Button variant="new" onClick={() => history.push("/join")}>Join Now <i class="fas fa-play"></i></Button>
                </p>
            </Jumbotron>
            <div id="home-bottom">
            <Container>
                <Row>
                    <Col>
                    <i class="fas fa-users symbol"></i>
                    <h3>Play with up to 10 people</h3>
                    <p>Minigames are designed to handle large or small amounts of people. 
                        Everyone gets a unique color at the start and sustains it between games.
                        All games use this color identify players.
                        Inviting your friends are easy as copying the room url and sharing it.
                        </p>
                    </Col>
                    <Col>
                    <i class="fas fa-trophy symbol"></i>
                    <h3>Try dozens of games</h3>
                    <p>From a tank battle game to the classic snake game, 
                        try all of them and level up along the way.
                        New games are always on their way.
                    </p>
                    </Col>
                    <Col>
                    <i class="fas fa-lock-open symbol"></i>
                    <h3>Compeletely free</h3>
                    <p>There are no micro-transactions or ads whatever, 
                        It's completely free and fully open-source</p>
                    </Col>
                </Row>
            </Container>
            </div>
            
        </div>
    )
}