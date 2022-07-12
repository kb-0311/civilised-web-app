import { Fragment } from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home.js';
import LandingPage from './components/Landing/Landing.js'
import Login from './components/Login/Login';
import { transitions, positions, Provider as AlertProvider } from '@blaumaus/react-alert'
import AlertTemplate from 'react-alert-template-basic'
function App() {

  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }


  return (
    <Fragment>
      <AlertProvider template={AlertTemplate} {...options}>
      <Router>
      {<Header/>}
        <Routes>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/welcome' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>


        </Routes>
      </Router>
      </AlertProvider>
    </Fragment>
  );
}

export default App;
