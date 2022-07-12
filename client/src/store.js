import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/UserReducer";
const initialState = {};
const store = configureStore({
    reducer : {
        user : userReducer,
    }
});

export default store