import { configureStore } from "@reduxjs/toolkit";
import { allUsersReducer, getPostsReducer, userReducer } from "./Reducers/UserReducer";
const initialState = {};
const store = configureStore({
    reducer : {
        user : userReducer,
        getPosts : getPostsReducer,
        allUsers: allUsersReducer,
    }
});

export default store