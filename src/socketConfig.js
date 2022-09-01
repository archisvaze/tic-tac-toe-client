import io from 'socket.io-client';

const socket = io("https://tic-tac-toe-archis.herokuapp.com/")

export default socket;