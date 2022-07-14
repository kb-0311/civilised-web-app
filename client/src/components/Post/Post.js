import { Avatar, Button, Dialog, Typography } from '@mui/material'
import React, { useState } from 'react'
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  Delete,
} from "@mui/icons-material";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Post.css'
import AlertTemplate from '../Metadata/AlertTemplate';
import { addCommentOnPost, likePost } from '../../Actions/PostsActions';
import { useEffect } from 'react';
import { getPosts } from '../../Actions/UserActions';
import User from '../User/User'
import CommentCard from "../CommentCard/CommentCard.js";
const Post = ({postId , caption , postImage , likes=[] , comments =[] , isLiked , ownerImage ,ownerId ,ownerName , isDelete=false , isAccount=false}) => {
    const dispatch = useDispatch();
    const [likesUser, setLikesUser] = useState(null);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
    const {currentUser} = useSelector(state => state.user);
    const {message} = useSelector(state => state.like);

      let init = likes.some(i=>{
        if (i._id===currentUser._id) {
          return true;
        } else {
          return false;
        }
      })

    const [liked, setLiked] = useState(init);
    const [likeAlert, setlikeAlert] = useState(false);
    const [noOfLikes, setnoOfLikes] = useState(likes.length);


    const handleLike = async () => {
      setLiked(!liked);
      setlikeAlert(!likeAlert);
      dispatch(likePost(postId));
      if (liked) {
        setnoOfLikes(noOfLikes-1);
      } else {
        setnoOfLikes(noOfLikes+1);

      }
      /*
      if (isAccount) {
        dispatch(getMyPosts());
      } else {
        dispatch(getFollowingPosts());
      }
      */
    };
    

    const addCommentHandler =async (e) =>{
      
        dispatch(addCommentOnPost(postId , commentValue));
    }
    

    
    
    
  
    return (
    <div className='post'>
      {likeAlert? <AlertTemplate severity={'success'} message={message} /> : null}
        <div className="postHeader">
          {isAccount?
            (<Button>
              <MoreVert />
            </Button>)
            :
            null
            
          }
        </div>
            <img src={postImage} alt='post image' />
        <div className='postDetails'>
                <Avatar src={ownerImage} alt="user" sx={{height :"3vmax" , width : "3vmax"}} />

                <Link to={`/user/${ownerId}`} >
                    <Typography fontWeight={700} >{ownerName}</Typography>
                </Link>

                <Typography fontWeight={100} color="rgba(0, 0, 0, 0.582)" sx={{ alignSelf: "center" }}>
                    {caption}
                </Typography>
        </div>

        <button
        style={{
          border: "none",
            backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() =>{ setLikesUser(!likesUser) }}
            disabled={likes.length === 0 ? true : false}
        >
                <Typography>{noOfLikes} Likes</Typography>
        </button>

        <div className='postFooter'>
          <Button onClick={()=>handleLike()}>
            {liked? 
                  <Favorite style={{color:"ff7300"}} />

                                  
                  :<FavoriteBorder />}
          </Button>
          <Button onClick={()=>{setCommentToggle(!commentToggle)}}>
            <ChatBubbleOutline />
          </Button>
          { isDelete?
          <Button>
             <Delete />
          </Button>:null}

        </div>

        <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
          <div className="DialogBox">
            <Typography variant="h4">Liked By</Typography>

              {likes.map((like) => (
                <User
                  key={like._id}
                  userId={like._id}
                  name={like.name}
                  avatar={like.avatar.url}
                />
              ))}
          </div>
        </Dialog>

        <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler} >
          
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" sx={{backgroundColor:"orange" , "&:hover":{"backgroundColor":"black"}}} variant="contained">
              Add
            </Button>
          </form>

          {comments.length > 0 ? (
            comments.map((i) => (
              
              <CommentCard
              
                userId={i.commentedByUser._id}
                name={i.commentedByUser.name}
                avatar={i.commentedByUser.avatar.url}
                comment={i.comment}
                commentId={i._id}
                key={i._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>

            
        
        
    </div>
  )
}

export default Post