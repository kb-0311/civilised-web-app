import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetPassword } from '../../Actions/UserActions';
import Loader from '../Loader/Loader'
import AlertTemplate from '../Metadata/AlertTemplate';
import './ResetPassword.css'

const ResetPassword = () => {


    const [newPassword, setNewPassword] = useState("");
    const [errorAlert, seterrorAlert] = useState(false);
    const [errorAlertMessage, seterrorAlertMessage] = useState(false);
    const [successAlert, setsuccessAlert] = useState(false);
    const [successAlertMessage, setsuccessAlertMessage] = useState(false);


    const dispatch = useDispatch();
    const params = useParams();
    const { error, loading, message } = useSelector((state) => state.like);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, newPassword));
    };

    useEffect(() => {
        if (error) {
            seterrorAlert(true);
            seterrorAlertMessage(error);
            dispatch({type:"clearErrors"})

        }
        
        if (message) {
            setsuccessAlert(true);
            setsuccessAlertMessage(message);
          dispatch({ type: "clearMessage" });
        }

      }, [ error, dispatch, message]);


  return loading?(<Loader />): (
    <div className="resetPassword">
        {
            errorAlert? <AlertTemplate severity={'error'} message={errorAlertMessage} /> :null
        }
        {
            successAlert? <AlertTemplate severity={'success'} message={'Updated Now Go to login to try again'} />:null
        }
    <form className="resetPasswordForm" onSubmit={submitHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" ,color : "orange" }}>
        IIITP CIVILISED
      </Typography>

      <input
        type="password"
        placeholder="New Password"
        required
        className="updatePasswordInputs"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Link to="/">
        <Typography style={{ padding: "2vmax"  , color : "orange"}}>Login</Typography>
      </Link>
      <Typography style={{ padding: "2vmax"  , color : "orange"}}>Or</Typography>

      <Link to="/forgot/password">
        <Typography style={{ padding: "2vmax"  , color : "orange"}}>Request Another Token!</Typography>
      </Link>

      <Button variant='contained' sx={{color :'orange' ,  backgroundColor :'#ffe1a1' ,"&:hover": {backgroundColor : 'white'}}}  disabled={loading} type="submit">
        Reset Password
      </Button>
    </form>
  </div>
  )
}

export default ResetPassword