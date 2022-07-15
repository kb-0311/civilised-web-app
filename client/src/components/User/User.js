import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Typography } from '@mui/material'

const User = ({userId , name , avatar ,isSearch=false}) => {
  const [color, setColor] = useState("black");
  useEffect(() => {
    if (isSearch) {
      setColor("orange");
    
    } else {
      setColor("black");
    }
  }, [isSearch])
  
  return (
    
        
        <Link to={`/user/${userId}`} className='homeUser'>
            <img src={avatar} alt={name} />
            <Typography sx={{color:color}}>{name}</Typography>
        </Link>
    
    
  )
}

export default User