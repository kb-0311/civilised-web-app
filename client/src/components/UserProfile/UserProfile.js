import { Avatar, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { followAndUnfollowUser, getUserPosts, getUserProfile } from '../../Actions/UserActions';
import Loader from '../Loader/Loader';
import AlertTemplate from '../Metadata/AlertTemplate';
import Post from '../Post/Post';
import User from '../User/User';

const UserProfile = () => {


    const dispatch = useDispatch();
  
    const {
      user,
      loading: userLoading,
      error: userError,
    } = useSelector((state) => state.userProfile);
  
    const { currentUser : me } = useSelector((state) => state.user);
    const { loading, error, posts } = useSelector((state) => state.userPosts);
    const {
      error: followError,
      message,
      loading: followLoading,
    } = useSelector((state) => state.like);
  
    const params = useParams();
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following, setFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState(false);
    const [errorAlert, seterrorAlert] = useState(false);
    const [errorAlertMessage, seterrorAlertMessage] = useState("");
    const [successAlert, setsuccessAlert] = useState(false);
    const [successAlertMessage, setsuccessAlertMessage] = useState("");


  
    const followHandler = async () => {
      await dispatch(followAndUnfollowUser(user._id));
      setFollowing(!following);
        window.location.reload();
      
    };
    const getUserProfileFuck = async()=>{
        await dispatch(getUserProfile(params.id));
        await dispatch(getUserPosts(params.id));


    }
  
    useEffect(() => {
      
      if ( (user==undefined) ||(user&&user._id!=params.id)) {
        setFollowersToggle(false)
        setFollowingToggle(false);
        getUserProfileFuck();

      }

        
    }, [user ,params ,getUserProfileFuck]);

    
    
  
    useEffect(() => {
      if (me._id === params.id) {
        setMyProfile(true);
      } else {
        setMyProfile(false);
      }
      if (user) {
        if (user&&user.followers==null) {
          setFollowing(false);
          
        } else {
          user && user.followers.forEach((item) => {
            if (item._id === me._id) {
              setFollowing(true);
            } else {
              setFollowing(false);
            }
          });
        }
        
      }
    }, [user, me._id, params.id]);
    
    useEffect(() => {
      if (error ||followError ||userError) {
        seterrorAlert(true);
        seterrorAlertMessage(error);
        dispatch({ type: "clearErrors" });
      }
  
      
      if (message) {
        setsuccessAlert(true);
        setsuccessAlertMessage(message);
        dispatch({ type: "clearMessage" });
      }
    }, [alert, error, message, followError, userError, dispatch]);
    
    return loading === true || userLoading === true ? (
      <Loader />
    ) : (
      <div className="account">
        <div className="accountleft">
            {
                errorAlert? <AlertTemplate severity={'error'} message={errorAlertMessage} />:null
            }
            {
                successAlert? <AlertTemplate severity={'success'} message={successAlertMessage} />:null

            }
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
              />
            ))
          ) : (
            <Typography variant="h6">User has not made any post</Typography>
          )}
        </div>
        <div className="accountright">
          {user && (
            <>
              <Avatar
                src={user.avatar.url}
                sx={{ height: "8vmax", width: "8vmax" }}
              />
  
              <Typography variant="h5">{user.name}</Typography>
  
              <div>
                <button onClick={() => setFollowersToggle(!followersToggle)}>
                  <Typography>Followers</Typography>
                </button>
                <Typography>{user.followers.length}</Typography>
              </div>
  
              <div>
                <button onClick={() => setFollowingToggle(!followingToggle)}>
                  <Typography>Following</Typography>
                </button>
                <Typography>{user.following.length}</Typography>
              </div>
  
              <div>
                <Typography>Posts</Typography>
                <Typography>{user.posts.length}</Typography>
              </div>
  
              {myProfile ? null : (
                <Button
                  variant="contained"
                  style={{ background: following ? "red" : "orange" }}
                  onClick={followHandler}
                  disabled={followLoading}
                >
                  {following ? "Unfollow" : "Follow"}
                </Button>
              )}
            </>
          )}
          <Dialog
            open={followersToggle}
            onClose={() => setFollowersToggle(!followersToggle)}
          >
            <div className="DialogBox">
              <Typography variant="h4">Followers</Typography>
  
              {user && user.followers.length > 0 ? (
                user.followers.map((follower) => (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower.avatar.url}
                  />
                ))
              ) : (
                <Typography style={{ margin: "2vmax" }}>
                  This User has no followers
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
  
              {user && user.following.length > 0 ? (
                user.following.map((follow) => (
                  <User
                    key={follow._id}
                    userId={follow._id}
                    name={follow.name}
                    avatar={follow.avatar.url}
                  />
                ))
              ) : (
                <Typography style={{ margin: "2vmax" }}>
                  This User's not following anyone
                </Typography>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    )
}

export default UserProfile