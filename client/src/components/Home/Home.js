import React, { useEffect, useState } from 'react'
import './Home.css'
import User from '../User/User.js'
import Post from '../Post/Post.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getPosts } from '../../Actions/UserActions'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'
import Metadata from '../Metadata/Metadata'
const Home = () => {
  const dispatch=useDispatch();
  const {currentUser} =useSelector(state=>state.user);
  const { loading,posts,error} = useSelector(state =>state.getPosts)
  const { usersLoading , users ,userError} =useSelector(state=>state.allUsers)
  const { error: likeError, message } = useSelector((state) => state.like);
  useEffect(() => {
    dispatch(getPosts());

    dispatch(getAllUsers());
    
  }, [dispatch])
  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      dispatch({ type: "clearErrors" });
    }
    
  }, [ error,  likeError, dispatch]);
  
  
  
  
  return loading===true||usersLoading===true? (
    <Loader />)
    :(
      <div className="home">
          <Metadata title='Civilised' />
        <div className="homeleft">
          {
            posts&&posts.length>0 ? posts.map((post)=>
              
            (<Post 
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              isLiked={false}
              isAccount={post.owner._id===currentUser._id}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id} 
            />)
              ): (<Typography variant='h6'>No posts</Typography>)
        } 
          
        </div>
        <div className="homeright">
          <Typography variant='h6'>COMPARTMENTS IN THE TRAIN 🚞 </Typography>
          {
            users ? users.map((user)=>(
              <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={'https://media-exp1.licdn.com/dms/image/C5603AQHlHovW8nMkFA/profile-displayphoto-shrink_200_200/0/1610020467592?e=2147483647&v=beta&t=vBPLqLRHM1Py_hRw7vSbT86TKE7UREGqCFyvoYGyJoc'}
              //avatar={currentUser.avatar.url}
            />
            )) : null
          }
              

        </div>

      </div> )

  
}

export default Home