import axios from "axios";

export const likePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "likeRequest",
      });
  
      const { data } = await axios.get(`/api/v1/post/${id}`);
      console.log(data);
      dispatch({
        type: "likeSuccess",
        payload: data.message,
        isLiked :data.isLiked
      });
    } catch (error) {
      dispatch({
        type: "likeFailure",
        payload: error.response.data.message,
      });
    }
  };