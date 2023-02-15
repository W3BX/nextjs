import { createSlice } from "@reduxjs/toolkit";
import userData from "userdata.json"
import fetchapi from "@/pages/api/fetch";

const intState = {
    userloggedin: false,
    username: '',
    chats: [],
    activeChat: {}
}

const userslice = createSlice({
    name: "user",
    initialState: intState,
    reducers: {
        startChat(state, action) {
            return {
                ...state,
                activeChat: action.payload
            }
        },
        loginUser(state, action) {
            return {
                ...state,
                username: action.payload,
                userloggedin: true
            }
        },
        logoutUser(state, action) {
            return {
                ...state,
                username: '',
                userloggedin: false,
                activeChat: {},
                chats: []
            }
        },
        addChat(state, action) {
            return {
                ...state,
                chats: [...state.chats, action.payload],
                activeChat: action.payload
            }

        }
    }
})

export const { startChat, loginUser, logoutUser, addChat } = userslice.actions

export default userslice.reducer