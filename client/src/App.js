import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

//components
import Navbar from './components/Navbar'

//pages
import browse from './pages/browse';
import login from './pages/login';
import signup from './pages/signup';
import createpost from './pages/createPost'

class App extends Component {
  render(){
  return (
    <div className="App">
      <Router>
        <Navbar/>
          
          <Switch>
            <Route exact path='/' component={browse}/>
            <Route exact path='/login' component={login}/>
            <Route exact path='/signup' component={signup}/>
            <Route exact path='/createpost' component={createpost}/>
          </Switch>
          
     </Router>
    </div>
  );
  }
}

export default App;
