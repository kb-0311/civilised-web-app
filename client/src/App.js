import { Fragment, useEffect, useState } from 'react';
import {BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home.js';
import LandingPage from './components/Landing/Landing.js'
import Login from './components/Login/Login';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/UserActions';
import Account from './components/Account/Account.js'
import NewPost from './components/NewPost/NewPost';
import Register from './components/Register/Register';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UserProfile from './components/UserProfile/UserProfile';
import Search from './components/Search/Search';
import Error from './components/Error/Error';
function App() {



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])
  
  const  {isAuthenticated} = useSelector(state=>state.user);

  const [reload, setReload] = useState(false);


  return (
    <Fragment>
      <Router>
      {isAuthenticated && <Header/>}
        <Routes>
          
          <Route path='/' element={!isAuthenticated? (<Navigate to='/login' replace={true} />): (<Home/>)}/>
          <Route path='/welcome' element={<LandingPage/>}/>
          <Route path='/login' element={!isAuthenticated? <Login/> :(<Navigate to='/' replace={true}/>)}/>
          <Route path='/account' element={!isAuthenticated? (<Navigate to='/' />): <Account/>}/>
          <Route path='/post/new' element={!isAuthenticated? (<Navigate to='/' />): <NewPost/>}/>
          <Route path='/register' element={!isAuthenticated?  <Register/> : (<Navigate to='/login' />) }/>
          <Route path='/me/update' element={!isAuthenticated?  (<Navigate to='/login' />) : <UpdateProfile/>  }/>
          <Route path='/me/password/update' element={!isAuthenticated?  (<Navigate to='/login' />) : <UpdatePassword/>  }/>
          <Route path='/forgot/password' element={!isAuthenticated? (<ForgotPassword/>) : (<Navigate to='/login' />)  }/>
          <Route path='/password/reset/:token' element={!isAuthenticated? (<ResetPassword/>) : (<Navigate to='/login' />)  }/>
          <Route path='/user/:id' element={!isAuthenticated? (<Navigate to='/' />): <UserProfile/>}/>
          <Route path='/search' element={!isAuthenticated? (<Navigate to='/' />): <Search/>}/>
          <Route path='*' element={<Error/>} />



        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
