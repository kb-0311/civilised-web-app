import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/PostsActions";
import { getPosts, getMyPosts } from "../../Actions/UserActions";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteCommentHandle = async(e) => {
   
   let id = postId;
    await dispatch(deleteCommentOnPost(id, commentId));
    
    window.location.reload();
  };
  
  

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography style={{ paddingLeft: "3vmax"}}>{comment}</Typography>

      {isAccount ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : userId=== currentUser._id? (
        <Button type="submit" onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;