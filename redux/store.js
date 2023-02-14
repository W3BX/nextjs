import { configureStore } from "@reduxjs/toolkit";
import userslice from "./slice/userslice";

const store = configureStore({
    reducer: {
        user: userslice
    }
})

export default store