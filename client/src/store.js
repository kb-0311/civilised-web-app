import { configureStore } from "@reduxjs/toolkit";
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/PostReducers";
import { allUsersReducer, getPostsReducer, userProfileReducer, userReducer } from "./Reducers/UserReducer";
const initialState = {};
const store = configureStore({
    reducer : {
        user : userReducer,
        getPosts : getPostsReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myposts :myPostsReducer,
        userProfile: userProfileReducer,
        userPosts: userPostsReducer,
    }
});

export default store