import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import {Home , HomeOutlined ,SearchOutlined,
    Search,AccountCircle,
    AccountCircleOutlined,
    Add,
    AddOutlined,
    Forum,
    Campaign,
    CottageOutlined} from '@mui/icons-material'
const Header = () => {
    const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className='HeaderWrapper'>
    <div className='header'>
        <Link to="/" onClick={(e) => setTab('/')}>
            {tab ==="/"? (<HomeOutlined style={{color:"rgb(255, 255, 255)"}} />) :(<Home/>) }
        </Link>

        <Link to="/post/new" onClick={(e) => setTab('/post/new')}>
            {tab ==="/post/new"? (<AddOutlined style={{color:"rgb(255, 255, 255)"}} />) :(<Add/>) }
        </Link>

        <Link to="/search" onClick={(e) => setTab('/search')}>
            {tab ==="/search"? (<SearchOutlined style={{color:"rgb(255, 255, 255)"}} />) :(<Search/>) }
        </Link>

        <a href='https://iiitp-civilised.netlify.app/' target="_blank">
            <Campaign/>
        </a>

        <a href='https://iiitp-civilised.netlify.app/' target="_blank">
            <Forum/>
        </a>

        <Link to='/account' onClick={(e) => setTab('/account')}>
            {tab ==="/account"? (<AccountCircleOutlined style={{color:"rgb(255, 255, 255)"}} />) :(<AccountCircle/>) }

            
        </Link>

        

    </div>
    </div>
  )
}

export default Header