import { Fragment } from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home.js';
import LandingPage from './components/Landing/Landing.js'

function App() {
  return (
    <Fragment>
      <Router>
      {<Header/>}
        <Routes>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/welcome' element={<LandingPage/>}/>

        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
