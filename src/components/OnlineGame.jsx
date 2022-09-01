import { useState } from "react";
import Board from "./Board";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socket from "../socketConfig";
import { useEffect } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';



let startingBoard = new Array(3).fill().map(er => new Array(3).fill(" "));

function OnlineGame(props) {

    const state = useSelector(state => state.myState);
    // eslint-disable-next-line 
    const dispatch = useDispatch();
    const roomId = useParams().id;

    let status = '-';
    let [currBoard, setCurrBaord] = useState(startingBoard);
    let [isXPlaying, setisXPLaying] = useState(true);
    // eslint-disable-next-line 
    let [gameStatus, setGameStatus] = useState("");
    let [popup, setPopup] = useState(["", false])


    let currStatus = ticTacToeGameStatus(currBoard)
    function click(row, col) {
        let currPlayer = isXPlaying ? "X" : "O";
        let nextPlayer = isXPlaying ? "O" : "X";
        if (state.player === currPlayer) {
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
            let data = { from: state.clientId, to: state.roomId, board: copyBoard, nextPlayer: nextPlayer, popup: false }
            socket.emit("send-data", data, state.roomId)
        }
    }

    function reset() {
        setCurrBaord(startingBoard);
        setGameStatus(status)
        setPopup(["", false])
        let data = { from: state.clientId, to: state.roomId, board: startingBoard, nextPlayer: "X", popup: false }
        socket.emit("send-data", data, state.roomId)
    }

    useEffect(() => {
        setPopup(["Waiting for Oponent", true])
        socket.on("players-connected", (data) => {
            console.log("Players Connected")
            setPopup(["", false])
        })
        socket.on("receive-data", data => {
            console.log(data)
            setPopup(["", data.popup])
            let board = data.board;
            let nextPlayer = data.nextPlayer;
            //set board
            setCurrBaord(board);
            setisXPLaying(nextPlayer === "X" ? true : false)
            // eslint-disable-next-line 
            currStatus = ticTacToeGameStatus(board)
            if (currStatus === "Player X has won" || currStatus === "Player O has won" || currStatus === "Game is drawn") {
                setPopup([currStatus, true])
            }
            setGameStatus(currStatus);
        })
        // eslint-disable-next-line 
    }, [])

    return (
        <div className="game">


            <div style={{ display: popup[1] === true ? "flex" : "none", color: isXPlaying ? "#f1b238" : "#2ec5c0" }} className="popup">{popup[0]}
                <button style={{ display: popup[0] === "Waiting for Oponent" ? "none" : "flex" }} onClick={() => reset()} className="restart-btn">Restart</button>
            </div>

            <h2 style={{ color: isXPlaying ? "#2ec5c0" : "#f1b238" }} className={"next-player"}>{isXPlaying ? "X" : "O"}'s Turn</h2>
            <p className="socket name"> You are {state.player}</p>

            <div className="board">
                <Board click={click} currBoard={currBoard} isDisabled = {popup[1]} />
            </div>


            <div style={{ display: state.player === "X" ? "flex" : "none" }} className="footer">
                <p className="invite-text">Invite another Player by sharing the Room Id</p>
                <p className="socket-id">{roomId}</p>

                <CopyToClipboard
                    text={roomId}
                >
                    <button className="clipboard-btn" onClick={(e) => {
                        e.preventDefault();
                    }} >Copy to Clipboard</button>
                </CopyToClipboard>
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

export default OnlineGame;