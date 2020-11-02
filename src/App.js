import React from 'react';
import NavBar from './components/navbar'
import './App.css'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/screens/home'
import Profile from './components/screens/profile'
import Login from './components/screens/login'
import Signup from './components/screens/signup'

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    </BrowserRouter>
  );
}

export default App;
