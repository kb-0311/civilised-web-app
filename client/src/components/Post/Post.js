import { Avatar, Button, Typography } from '@mui/material'
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
import { likePost } from '../../Actions/PostsActions';
import { useEffect } from 'react';
import { getPosts } from '../../Actions/UserActions';
const Post = ({postId , caption , postImage , likes=[] , comments =[] , isLiked , ownerImage ,ownerId ,ownerName , isDelete=false , isAccount=false}) => {
  
    const dispatch = useDispatch();
    const [likesUser, setLikesUser] = useState(null);
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
    console.log("isliked" +init);
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
      console.log(noOfLikes);
      /*
      if (isAccount) {
        dispatch(getMyPosts());
      } else {
        dispatch(getFollowingPosts());
      }
      */
    };
    
    

    
    
    
  
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
            backgroundColor: "orange",
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
          <Button>
            <ChatBubbleOutline />
          </Button>
          { isDelete?
          <Button>
             <Delete />
          </Button>:null}

        </div>

            
        
        
    </div>
  )
}

export default Post