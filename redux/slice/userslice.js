import { createSlice } from "@reduxjs/toolkit";
import userData from "userdata.json"
import fetchapi from "@/pages/api/fetch";

const userslice = createSlice({
    name: "user",
    initialState: {
        userloggedin: false,
        username: '',
        chats: []
    },
    reducers: {
        startChat(state, action) {
            const user = userData.users.find(value => value.id == action.payload)
            return state = user
        },
        loginUser(state, action) {
            state.username = action.payload
            state.userloggedin = true
        },
        logoutUser(state, action) {
            state.username = ''
            state.userloggedin = false
        },
        addChat(state, action) {
            state.chats = [...state.chats, action.payload]
        }
    }
})

export const { startChat, loginUser, logoutUser, addChat } = userslice.actions

export default userslice.reducer