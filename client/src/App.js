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


        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
