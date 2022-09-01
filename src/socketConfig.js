import io from 'socket.io-client';

const socket = io("http://localhost:8000", {
    withCredentials: false,
})

export default socket;