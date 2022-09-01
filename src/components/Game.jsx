import { useState } from "react";
import Board from "./Board";
let startingBoard = new Array(3).fill().map(er => new Array(3).fill(" "));

function Game(props) {
    let status = '-';
    let [currBoard, setCurrBaord] = useState(startingBoard);
    let [isXPlaying, setisXPLaying] = useState(true);
    let [gameStatus, setGameStatus] = useState(["", false]);
    let [popup, setPopup] = useState(false)

    let currStatus = ticTacToeGameStatus(currBoard)
    function click(row, col) {
        let copyBoard = JSON.parse(JSON.stringify(currBoard));
        currStatus = ticTacToeGameStatus(copyBoard)
        if (currStatus !== "Player X has won" && currStatus !== "Player O has won") {
            if (!(copyBoard[row][col] === "X" || copyBoard[row][col] === "O")) {
                copyBoard[row][col] = isXPlaying ? "X" : "O";
                setCurrBaord(copyBoard);
                setisXPLaying(!isXPlaying);
                currStatus = ticTacToeGameStatus(copyBoard)
            }
        }
        if (currStatus === "Player X has won" || currStatus === "Player O has won" || currStatus === "Game is drawn") {
            setPopup([currStatus, true])
        }
        setGameStatus(currStatus);
        console.log(gameStatus)
    }

    function reset() {
        setCurrBaord(startingBoard);
        setGameStatus(status)
        setPopup(["", false])
    }

    return (
        <div className="game">

            <div style={{ display: popup[1] === true ? "flex" : "none", color: isXPlaying ? "#f1b238" : "#2ec5c0" }} className="popup">{popup[0]}!
                <button onClick={() => reset()} className="restart-btn">Restart</button>
            </div>

            <h2 style={{ color: isXPlaying ? "#2ec5c0" : "#f1b238" }} className={"next-player"}>{isXPlaying ? "X" : "O"}'s Turn</h2>

            <div className="board">
                <Board click={click} currBoard={currBoard} />
            </div>

        </div>
    )
}




function ticTacToeGameStatus(board) {

    if (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") return "Player X has won";
    else if (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") return "Player X has won";
    else if (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") return "Player X has won";
    else if (board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") return "Player X has won";
    else if (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X") return "Player X has won";
    else if (board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") return "Player X has won";
    else if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") return "Player X has won";
    else if (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") return "Player X has won";
    else if (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O") return "Player O has won";//
    else if (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") return "Player O has won";
    else if (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O") return "Player O has won";
    else if (board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O") return "Player O has won";
    else if (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O") return "Player O has won";
    else if (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O") return "Player O has won";
    else if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") return "Player O has won";
    else if (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O") return "Player O has won";

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === undefined || board[i][j] === " ") {
                return "Game in progress";
            }
        }
    }
    return "Game is drawn";
}

export default Game;