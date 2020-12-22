import { Container } from "react-bootstrap";
import { useGame } from "./useGame";

export function Game(){
    const game = useGame()
    return(
        <Container>
            {game.userList.map((val) => <h1>{val}</h1>)}
        </Container>
    )
}