import { Jumbotron,Button } from "react-bootstrap";

export function Home(){
    return(
        <div>
            <Jumbotron fluid>
                <h1>The ultimate card game</h1>
                <p>
                Collect your cards and get into a battle of wits.
                </p>
                <p>
                <Button href="/join" variant="primary">Join Now <i class="fas fa-play"></i></Button>
                </p>
            </Jumbotron>
        </div>
    )
}