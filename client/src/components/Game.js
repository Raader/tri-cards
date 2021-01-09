import { Container } from "react-bootstrap";
import { useGame } from "../hooks/useGame";

export function Game(){
    const game = useGame()
    return(
        <Container>
            {game.userList.map((user) => <div onClick={() => window.location.pathname = "users/" + user.id}>
                <h1>{user.name}</h1>
                </div>)}
        </Container>
    )
}