import { createSlice } from "@reduxjs/toolkit";
import userData from "userdata.json"
import fetchapi from "@/pages/api/fetch";

const intState = {
    userloggedin: false,
    username: '',
    uid: '',
    chats: [],
    activeChat: {},
    chatID: '',
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
                username: action.payload.user,
                uid: action.payload.uid,
                chatID: action.payload.chatID,
                userloggedin: true
            }
        },
        logoutUser(state, action) {
            return {
                ...state,
                username: '',
                uid: '',
                chatID: '',
                userloggedin: false,
                activeChat: {},
                chats: [],
                chatSet: []
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

export const { startChat, loginUser, logoutUser, addChat, chatSet } = userslice.actions

export default userslice.reducer