import { Fragment, useEffect } from 'react';
import {BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home.js';
import LandingPage from './components/Landing/Landing.js'
import Login from './components/Login/Login';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/UserActions';
function App() {

  const  {isAuthenticated} = useSelector(state=>state.user);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])
  
  


  return (
    <Fragment>
      <Router>
      {isAuthenticated && <Header/>}
        <Routes>
          
          <Route path='/' element={!isAuthenticated? (<Navigate to='/login' />): <Home/> }/>
          <Route path='/welcome' element={<LandingPage/>}/>
          <Route path='/login' element={!isAuthenticated? <Login/> :(<Navigate to='/' />)}/>


        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
