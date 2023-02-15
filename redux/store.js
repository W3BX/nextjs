import { configureStore } from "@reduxjs/toolkit";
import userslice from "./slice/userslice";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// combine all reducers
const reducers = combineReducers({
    user: userslice
})


const store = configureStore({
    reducer: persistReducer({
        key: 'root',
        storage
    }, reducers),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export default store