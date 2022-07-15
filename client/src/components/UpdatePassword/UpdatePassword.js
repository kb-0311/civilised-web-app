import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../Actions/UserActions';
import Loader from '../Loader/Loader';
import AlertTemplate from '../Metadata/AlertTemplate';
import './UpdatePassword.css'
const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [alert, setalert] = useState(false);
    const [alertMessage, setalertMessage] = useState(null);
  
    const dispatch = useDispatch();
  
    const { error, loading, message } = useSelector((state) => state.like);
  
    const submitHandler = async (e) => {
      e.preventDefault();
      await dispatch(updatePassword(oldPassword, newPassword));
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
    return loading ? (<Loader/>):(
      <div className="updatePassword">
        {
            alert? <AlertTemplate severity={"error"} message={alertMessage}  />:null
        }
        <form className="updatePasswordForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" ,color:"orange" }}>
            this.Pass = new Pass();
          </Typography>
  
          <input
            type="password"
            placeholder="Old Password"
            required
            value={oldPassword}
            className="updatePasswordInputs"
            onChange={(e) => setOldPassword(e.target.value)}
          />
  
          <input
            type="password"
            placeholder="New Password"
            required
            className="updatePasswordInputs"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
  
          <Button disabled={loading} type="submit" variant='contained' sx={{marginTop:"1vmax" , backgroundColor: "rgb(255, 123, 0)" ,"&:hover": {backgroundColor : 'orange'}}}>
            Change Password
          </Button>
        </form>
      </div>
    );
}

export default UpdatePassword