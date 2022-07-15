import { Avatar, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, updateProfile } from '../../Actions/UserActions'
import Loader from '../Loader/Loader'
import './UpdateProfile.css'


const UpdateProfile = () => {


    const { loading, error, currentUser } = useSelector((state) => state.user);
    const {
        loading: updateLoading,
        error: updateError,
        message,
    } = useSelector((state) => state.like);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(currentUser.avatar.url);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);

        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    window.location.reload();

  };






  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" , color:"orange" }}>
          updateProfile();
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="updateProfileInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading} sx={{marginTop:"1vmax" , backgroundColor: "rgb(255, 123, 0)" ,"&:hover": {backgroundColor : 'orange'}}} variant='contained'  type="submit">
          Update
        </Button>
      </form>
    </div>)
}

export default UpdateProfile