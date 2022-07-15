import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewPost } from '../../Actions/PostsActions';
import { loadUser } from '../../Actions/UserActions';
import AlertTemplate from '../Metadata/AlertTemplate';
import './NewPost.css'

const NewPost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [alert, setalert] = useState(false);
    const [alertMessage, setalertMessage] = useState(null);


    const { loading, error, message } = useSelector((state) => state.like);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
    
        Reader.onload = () => {
          if (Reader.readyState === 2) {
            setImage(Reader.result);
          }
        };
    };



    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(createNewPost(caption, image));
        await dispatch(loadUser());
        if (!alertMessage) {
          window.location.reload();
        }
        
    };


    useEffect(() => {
        if (error) {
            setalert(true);
            setalertMessage(error);
          dispatch({ type: "clearErrors" });
        }
    
      }, [dispatch, error]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3" sx={{color : "orange"}}>Post ++</Typography>
        {
            alert? <AlertTemplate severity={"error"} message={alertMessage}  />:null
        }

        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button variant='contained' disabled={loading} type="submit" sx={{marginTop:"1vmax" , backgroundColor: "rgb(255, 123, 0)" ,"&:hover": {backgroundColor : 'orange'}}}>
          Post
        </Button>
      </form>
    </div>
  )
}

export default NewPost