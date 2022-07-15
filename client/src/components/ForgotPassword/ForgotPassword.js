import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../Actions/UserActions';
import Loader from '../Loader/Loader'
import AlertTemplate from '../Metadata/AlertTemplate';
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [alert, setalert] = useState(false);

    const dispatch = useDispatch();
    const { error, loading, message } = useSelector((state) => state.like);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
        setalert(true);
        
    };


  return loading?(<Loader/>):
    (

        <div className="forgotPassword">
            {
                alert? <AlertTemplate severity={'success'} message={'An email to reset your account has been sent to KB ask him for the link'} /> :null
            }
          <form className="forgotPasswordForm" onSubmit={submitHandler}>
            <Typography variant="h3" style={{ padding: "2vmax" , color :"orange" }}>
              IIITP CIVILISED
            </Typography>
    
            <input
              type="email"
              placeholder="Email"
              required
              className="forgotPasswordInputs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
    
            <Button variant='contained' sx={{color :'orange' ,  backgroundColor :'#ffe1a1' ,"&:hover": {backgroundColor : 'white'}}}  disabled={loading} type="submit">
              Send Token
            </Button>
          </form>
        </div>
  )
}

export default ForgotPassword