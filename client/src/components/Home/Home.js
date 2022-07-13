import React, { useEffect, useState } from 'react'
import './Home.css'
import User from '../User/User.js'
import Post from '../Post/Post.js'
import { useSelector } from 'react-redux'
const Home = () => {
  const {currentUser} = useSelector(state => state.user);
  const [user, setuser] = useState(null);
  

  useEffect(() => {
    setuser(currentUser);
  }, [])
  
  return (
    <div className="home">

      <div className="homeleft">
        <Post postImage={'https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9hYTkxNWJiNzQ1MjVhNGExYWYyZmZjODgxN2FmNTA4ND9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.Gaing-RMyIPZJEO8kEUHmEgSayXd0eBnm2UhCEBRGC0'} />
      </div>
      <div className="homeright">
            <User
              //key={user._id}
              userId={currentUser._id}
              name={currentUser.name}
              avatar={'https://media-exp1.licdn.com/dms/image/C5603AQHlHovW8nMkFA/profile-displayphoto-shrink_200_200/0/1610020467592?e=2147483647&v=beta&t=vBPLqLRHM1Py_hRw7vSbT86TKE7UREGqCFyvoYGyJoc'}
              //avatar={currentUser.avatar.url}
            />

      </div>

    </div>
  )
}

export default Home