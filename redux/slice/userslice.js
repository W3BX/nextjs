import { createSlice } from "@reduxjs/toolkit";
import userData from "userdata.json"
const userslice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        startChat(state, action) {
            const user = userData.users.find(value => value.id == action.payload)
            return state = user
        }
    }
})

export const { startChat } = userslice.actions

export default userslice.reducer