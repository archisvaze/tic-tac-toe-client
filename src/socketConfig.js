import io from 'socket.io-client';

const socket = io(location.origin, {
    withCredentials: false,
})

export default socket;