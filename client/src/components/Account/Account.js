import React, { useEffect } from 'react'
import './Account.css'
import {useDispatch, useSelector} from 'react-redux'
import {getMyPosts} from '../../Actions/UserActions'
import Loader from '../Loader/Loader'
import Metadata from '../Metadata/Metadata'
import Post from '../Post/Post'
import { Avatar, Button, Typography } from '@mui/material'

const Account = () => {



    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getMyPosts());
       
    }, [dispatch])

    const {loading,error , posts}=useSelector(state=>state.myposts);
    const { error: likeError, message } = useSelector((state) => state.like);
    const {currentUser}  =useSelector(state=>state.user);

    useEffect(() => {
      if (error) {
        dispatch({ type: "clearErrors" });
      }
  
      if (likeError) {
        dispatch({ type: "clearErrors" });
      }
      
    }, [ error,  likeError, dispatch]);
    


  return loading? (<Loader/>): (
    
    <div className='account'>
      <Metadata title="My Account" />
        <div className='accountleft'>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any post</Typography>
        )}
        </div>


        <div className='accountright'>
            <Avatar
              src={currentUser.avatar.url}
              sx={{ height: "8vmax", width: "8vmax"  }}
            />

            <Typography variant="h5">{currentUser.name}</Typography>

            <div>
              <button>
                <Typography>Followers</Typography>
              </button>
              <Typography>{currentUser.followers.length}</Typography>

            </div>

            <div>
              <button>
                <Typography>Following</Typography>
              </button>
              <Typography>{currentUser.followers.length}</Typography>

            </div>

            <div>
                <Typography>Posts</Typography>
              <Typography>{currentUser.posts.length}</Typography>

            </div>

            <Button sx={{backgroundColor:"orange" , color:"black" , "&:hover":{"backgroundColor":"orangered" , "color":"white"}}}>Logout</Button>
        </div>

    </div>
  )
}

export default Account