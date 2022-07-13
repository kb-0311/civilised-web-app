import { Avatar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Post.css'
const Post = ({postId , caption , postImage , likes=[] , comments =[] , ownerImage ,ownerId ,owner , isDelete=false , isAccount=false}) => {
  
    const [likesUser, setLikesUser] = useState(null);
    const [liked, setLiked] = useState(false);
  
    return (
    <div className='post'>
        <div className="postHeader"></div>
            <img src={postImage} alt='post image' />
        <div className='postDetails'>
                <Avatar src={ownerImage} alt="user" sx={{height :"3vmax" , width : "3vmax"}} />

                <Link to={`/user/${ownerId}`} >
                    <Typography fontWeight={700} >my name</Typography>
                </Link>

                <Typography fontWeight={100} color="rgba(0, 0, 0, 0.582)" sx={{ alignSelf: "center" }}>
                    hell yeah
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

        </div>

            
        
        
    </div>
  )
}

export default Post