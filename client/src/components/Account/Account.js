import React, { useEffect } from 'react'
import './Account.css'
import {useDispatch} from 'react-redux'
import {getMyPosts} from '../../Actions/UserActions'

const Account = () => {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getMyPosts());
       
    }, [dispatch])
    



  return (
    <div className='account'>
        <div className='accountleft'>
        </div>
        <div className='accountright'></div>

    </div>
  )
}

export default Account