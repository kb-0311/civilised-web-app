import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
const AlertTemplate = ({message , severity}) =>  {
    
    const [open, setOpen] = useState(true); 
    //Leave this true since we are not using a button

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>{message}</Alert>
  </Snackbar>
)
}


export default AlertTemplate