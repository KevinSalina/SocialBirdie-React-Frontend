import React from 'react';
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

// Components
import Navbar from './components/NavBar'
import AuthRoute from './components/AuthRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';

const token = localStorage.FBIdToken

let authenticated;

if (token) {
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
            <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
