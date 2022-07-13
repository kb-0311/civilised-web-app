import { Fragment, useEffect } from 'react';
import {BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home.js';
import LandingPage from './components/Landing/Landing.js'
import Login from './components/Login/Login';
import { transitions, positions, Provider as AlertProvider } from '@blaumaus/react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/UserActions';
function App() {

  const  {isAuthenticated} = useSelector(state=>state.user);
  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [])
  
  


  return (
    <Fragment>
      <AlertProvider template={AlertTemplate} {...options}>
      <Router>
      {isAuthenticated && <Header/>}
        <Routes>
          
          <Route path='/' element={!isAuthenticated? (<Navigate to='/login' />): <Home/> }/>
          <Route path='/welcome' element={<LandingPage/>}/>
          <Route path='/login' element={!isAuthenticated? <Login/> :(<Navigate to='/' />)}/>


        </Routes>
      </Router>
      </AlertProvider>
    </Fragment>
  );
}

export default App;
