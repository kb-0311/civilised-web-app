import { Avatar, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser, registerUser } from '../../Actions/UserActions';
import AlertTemplate from '../Metadata/AlertTemplate';
import './Register.css'
const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setalert] = useState(false);
    const [alertMessage, setalertMessage] = useState("");
    const [errorRegister, seterrorRegister] = useState(null);


    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);
    const { isAuthenticated } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler =async (e) => {
    e.preventDefault();
    await dispatch(registerUser(name, email, password, avatar));
    window.location.reload();
    
    
  };

  useEffect(() => {
    if (error) {
        if (error==="Please insert your avatar") {
            setalert(true);
            setalertMessage(error);
        }
        if (error==="This Email Already exists") {
            setalert(true);
            setalertMessage(error);
        }
        dispatch({type:"clearErrors"})
    }
    
  }, [dispatch ,error])
  
  

  return (
    <div className="register">
        {
            alert? <AlertTemplate severity={'error'} message={alertMessage} />: null 
        }
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax"  , color : "orange"}}>
          IIITP CIVILISED
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/">
          <Typography style={{ padding: "2vmax"  , color : "orange"}}>Already Signed Up? Login Now</Typography>
        </Link>

        <Button disabled={loading} sx={{marginTop:"1vmax" , backgroundColor: "rgb(255, 123, 0)" ,"&:hover": {backgroundColor : 'orange'}}} variant='contained' type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Register