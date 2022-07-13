import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
export const userReducer = createReducer(initialState , {

    LoginRequest: (state) => {
        state.loading = true;
      },
      LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      },
    
      RegisterRequest: (state) => {
        state.loading = true;
      },
      RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      },
    
      LoadUserRequest: (state) => {
        state.loading = true;
      },
      LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.currentUser;
        state.isAuthenticated = true;
      },
      LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      },
    
      LogoutUserRequest: (state) => {
        state.loading = true;
      },
      LogoutUserSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      },
      LogoutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
      },
    
      clearErrors: (state) => {
        state.error = null;
      },

});

export const getPostsReducer = createReducer(initialState, {
  getPostsRequest: (state) => {
    state.loading = true;
  },
  getPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  getPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});


export const allUsersReducer = createReducer(initialState, {
  getAllUsersRequest: (state) => {
    state.usersLoading = true;
  },
  getAllUsersSuccess: (state, action) => {
    state.usersLoading = false;
    state.users = action.payload;

  },
  getAllUsersFailure: (state, action) => {
    state.usersLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});