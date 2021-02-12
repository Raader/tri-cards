import { Jumbotron,Button, Carousel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import tank from "../tank.png"
import snake from "../snake.png"
export function Home(){
    const history = useHistory();
    return(
        <div>
            
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
                <Button variant="classic" onClick={() => history.push("/join")}>Join Now <i class="fas fa-play"></i></Button>
                </p>
            </Jumbotron>
            <Carousel id="main-caro">
                <Carousel.Item>
                <Carousel.Caption>
                    <h3>Tank Minigame</h3>
                    <p>One for all deatmatch</p>
                    </Carousel.Caption>
                    <img className="caro-img" src={tank}>
                    </img>
                    

                </Carousel.Item>
                <Carousel.Item>
                <Carousel.Caption>
                    <h3>Snake Minigame</h3>
                </Carousel.Caption>
                <img className="snake-img" src={snake}>
                    </img>
                </Carousel.Item>
            </Carousel>
            
        </div>
    )
}