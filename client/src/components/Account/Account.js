import React, { useEffect, useState } from 'react'
import './Account.css'
import {useDispatch, useSelector} from 'react-redux'
import {deleteMyProfile, getMyPosts, logoutUser} from '../../Actions/UserActions'
import Loader from '../Loader/Loader'
import Metadata from '../Metadata/Metadata'
import Post from '../Post/Post'
import { Avatar, Button, Dialog, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import User from '../User/User'

const Account = () => {

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async() => {
      await dispatch(logoutUser());
      navigate('/login', { replace: true });  
    };

    const deleteProfileHandler = async () => {
      await dispatch(deleteMyProfile());
      window.location.reload();
      //navigate('/login', { replace: true });  

    };



    useEffect(() => {
      dispatch(getMyPosts());
       
    }, [dispatch])

    const {loading,error , posts}=useSelector(state=>state.myposts);
    const { error: likeError, message ,loading:deleteLoading } = useSelector((state) => state.like);
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
              <button onClick={()=>setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{currentUser.followers.length}</Typography>

            </div>

            <div>
              <button onClick={()=>setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{currentUser.following.length}</Typography>

            </div>

            <div>
                <Typography>Posts</Typography>
              <Typography>{currentUser.posts.length}</Typography>

            </div>

            <Button variant='contained' onClick={logoutHandler}
              sx={{backgroundColor:"orange" , color:"black" , "&:hover":{"backgroundColor":"orangered" , "color":"white"}}}>
              Logout
            </Button>


            <Link to='/me/update'> Edit Profile</Link>

            <Link to='/me/password/update'>Change Password</Link>

            <Button onClick={deleteProfileHandler} disabled={deleteLoading} variant='outlined' sx={{margin:"2vmax" , color:"red" , borderColor:"red" ,"&:hover":{ "borderColor":"red","backgroundColor":"orangered" , "color":"white"}}} >Delete My Profile</Button>
            


            <Dialog
              open={followersToggle}
              onClose={() => setFollowersToggle(!followersToggle)}
            >
              <div className="DialogBox">
                <Typography variant="h4">Followers</Typography>

                {currentUser && currentUser.followers.length > 0 ? (
                  currentUser.followers.map((follower) => (
                    <User
                      key={follower._id}
                      userId={follower._id}
                      name={follower.name}
                      avatar={follower.avatar.url}
                    />
                  ))
                ) : (
                  <Typography style={{ margin: "2vmax" }}>
                    You have no followers
                  </Typography>
                )}
              </div>
            </Dialog>

            <Dialog
              open={followingToggle}
              onClose={() => setFollowingToggle(!followingToggle)}
            >
              <div className="DialogBox">
                <Typography variant="h4">Following</Typography>

                {currentUser && currentUser.following.length > 0 ? (
                  currentUser.following.map((follow) => (
                    <User
                      key={follow._id}
                      userId={follow._id}
                      name={follow.name}
                      avatar={follow.avatar.url}
                    />
                  ))
                ) : (
                  <Typography style={{ margin: "2vmax" }}>
                    You're not following anyone
                  </Typography>
                )}
              </div>
              </Dialog>

        </div>

    </div>
  )
}

export default Account