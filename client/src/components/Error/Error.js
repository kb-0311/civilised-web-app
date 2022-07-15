import React from 'react'
import './Error.css'
import { ErrorOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline />
        <Typography variant="h2" style={{ padding: "2vmax" , color:"orange" }}>
          Page Not Found
        </Typography>

        <Link to="/">
          <Typography style={{color :"orange"}} variant="h5">Go to Home</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Error