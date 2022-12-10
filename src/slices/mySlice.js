import { createSlice } from "@reduxjs/toolkit";
let initialState = {};
initialState = { roomId: "", clientId: "", waiting: true, player: "", name: "", opponentName: "", alert: ["", false, "error"], };

const mySlice = createSlice({
    name: "mySlice",
    initialState: initialState,
    reducers: {
        setroomId: (state, action) => {
            state.roomId = action.payload;
        },
        setclientId: (state, action) => {
            state.clientId = action.payload;
        },
        setwaiting: (state, action) => {
            state.waiting = action.payload
        },
        setPlayer: (state, action) => {
            state.player = action.payload
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
    }
})


export const { setclientId, setroomId, setwaiting, setPlayer, setAlert } = mySlice.actions;
export default mySlice.reducer;