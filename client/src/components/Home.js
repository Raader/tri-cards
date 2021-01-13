import { Jumbotron,Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export function Home(){
    const history = useHistory();
    return(
        <div>
            <Jumbotron fluid>
                <h1>The ultimate card game</h1>
                <p>
                Collect your cards and get into a battle of wits.
                </p>
                <p>
                <Button onClick={() => history.push("/join")} variant="primary">Join Now <i class="fas fa-play"></i></Button>
                </p>
            </Jumbotron>
        </div>
    )
}