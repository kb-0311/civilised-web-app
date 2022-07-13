import axios from "axios";

const baseUrl = "http://localhost:8000";


export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const  {data}  = await axios.get("/api/v1/me");
    dispatch({
      type: "LoadUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getPostsRequest",
    });

    const { data } = await axios.get("/api/v1/posts");
    dispatch({
      type: "getPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "getPostsFailure",
      payload: error.response.data.message,
    });
  }
};


export const getAllUsers= (name=null) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });
    

    const {data} = !name? await axios.get(`/api/v1/users/all?name=`):await axios.get(`/api/v1/users/all?name=${name}`)
    console.log(data);
    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailure",
      payload: error.response.data.message,
    });
  }
};