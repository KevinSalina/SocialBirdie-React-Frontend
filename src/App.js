import React from 'react';
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// Components
import Navbar from './components/NavBar'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
