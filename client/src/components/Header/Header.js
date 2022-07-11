import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import {Home , HomeOutlined ,SearchOutlined,
    Search,AccountCircle,
    AccountCircleOutlined,
    Add,
    AddOutlined,
    Forum,
    Campaign} from '@mui/icons-material'
const Header = () => {
  return (
    <div className='HeaderWrapper'>
    <div className='header'>
        <Link to="/">
            <Home/>
        </Link>

        <Link to="/post/new">
            <Add/>
        </Link>

        <Link to="/search">
            <Search/>
        </Link>

        <a href='https://iiitp-civilised.netlify.app/' target="_blank">
            <Campaign/>
        </a>

        <a href='https://iiitp-civilised.netlify.app/' target="_blank">
            <Forum/>
        </a>

        <Link to='/account'>
            <AccountCircle/>
        </Link>

        

    </div>
    </div>
  )
}

export default Header