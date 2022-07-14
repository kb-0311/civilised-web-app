import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useAlert} from '@blaumaus/react-alert'
import './Login.css'
import {Typography , Button} from '@mui/material'
import { Link } from 'react-router-dom';
import { loginUser } from '../../Actions/UserActions';
import Metadata from '../Metadata/Metadata';
import AlertTemplate from '../Metadata/AlertTemplate';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setalert] = useState(false);
    const dispatch = useDispatch();
    const {isAuthenticated} =useSelector(state=>state.user)

    const loginHandler = async(e) =>{
        e.preventDefault();
        dispatch(loginUser(email , password));
        if (!isAuthenticated) {
            setalert(true);
        }
    }

  return (
    <div className='login'>
        <Metadata title='login' />
        { 
            alert? (<AlertTemplate severity={'error'} message='Wrong email or Password' />):(null)
            
        }
        <form className='loginForm' onSubmit={loginHandler}>
            <Typography variant="h3" style={{ padding: "2vmax" , color:"orange" }}>
                IIITP CIVILISED
            </Typography>
            <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <Link to="/forgot/password">
                <Typography style={{color :'orange'}}>Forgot Password?</Typography>
            </Link>

            <Button variant='contained' sx={{color :'orange' ,  backgroundColor :'#ffe1a1' ,"&:hover": {backgroundColor : 'white'}}}  size='large' type="submit">Login</Button>

            <Link to="/register">
                <Typography style={{color :'orange'}}>New User?</Typography>
            </Link>
        </form>
    </div>
  )
}

export default Login