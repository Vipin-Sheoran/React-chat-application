import React from 'react'
import './App.css';
import Login from './Login'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Chatroom from './Chatroom'



function App() {

  return (
    <Router>
    <div className="App">
      <Switch>
       <Route exact path='/'>
       <Login />
       </Route>
       <Route path='/chatroom'>
         <Chatroom />
       </Route>
      <Route path='*'>
<h1>Oops page not found</h1>
      </Route>
      </Switch>
     
    </div>
    </Router>
  );
}

export default App;
