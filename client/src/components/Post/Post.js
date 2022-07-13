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
import './Post.css'
const Post = ({postId , caption , postImage , likes=[] , comments =[] , ownerImage ,ownerId ,ownerName , isDelete=false , isAccount=false}) => {
  
    const [likesUser, setLikesUser] = useState(null);
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
      setLiked(!liked);
      /*
      await dispatch(likePost(postId));
  
      if (isAccount) {
        dispatch(getMyPosts());
      } else {
        dispatch(getFollowingPosts());
      }
      */
    };
  
    return (
    <div className='post'>
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
        onClick={() => setLikesUser(!likesUser)}
            disabled={likes.length === 0 ? true : false}
        >
                <Typography>{likes.length} Likes</Typography>
        </button>

        <div className='postFooter'>
          <Button onClick={()=>handleLike()}>
            {liked? <Favorite style={{color:"ff7300"}} /> :<FavoriteBorder />}
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