import { configureStore } from "@reduxjs/toolkit";
import userslice from "./slice/userslice";

const store = configureStore({
    reducer: {
        userid: userslice
    }
})

export default store