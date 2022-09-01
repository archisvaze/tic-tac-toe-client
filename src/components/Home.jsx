import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setclientId, setPlayer, setroomId } from '../slices/mySlice';
import { useSelector } from 'react-redux/es/exports';
import socket from '../socketConfig';


export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state.myState);




  useEffect(() => {
    socket.on("react-connection", (data) => {
      dispatch(setclientId(data))
    })
    socket.on("room-joined", data => {
      console.log("Room Joined: " + data.room)
      dispatch(setPlayer(data.player))
      navigate(`/${data.room}`)
    })
    socket.on("room-created", data => {
      console.log("Room Created: " + data.room)
      dispatch(setPlayer(data.player))
      navigate(`/${data.room}`)
    })
    // eslint-disable-next-line 
  }, [])

  function joinRoom() {
    socket.emit("join-room", { joiner: state.clientId, room: state.roomId, player: "O", playerName: state.name })
  }

  function createRoom() {
    dispatch(setroomId(state.clientId))
    socket.emit("create-room", { creator: state.clientId, room: state.clientId, player: "X", playerName: state.name })
  }

  return (
    <div className='home'>

      <div className="actions-container">

        <input onChange={(e) => dispatch(setroomId(e.target.value))} placeholder='Enter Room ID to Join' type="text" name='room' />

        <button onClick={() => {
          joinRoom();
        }} className="join-btn">Join Room</button>

        <div className="actions-buttons-container">

          <button onClick={() => {
            createRoom();
          }} className="create-btn">Create a new Room</button>

          <button onClick={() => {
            setTimeout(() => {
              navigate("/game")
            }, 500)
          }} className="local-btn">Play Locally</button>
        </div>
      </div>

    </div>


  )
}
