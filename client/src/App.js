import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import axios from 'axios';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions'

//components
import NavBar from './components/NavBar'
import Footer from './components/Footer'

//pages
import browse from './pages/browse';
import login from './pages/login';
import signup from './pages/signup';
import createPost from './pages/createPost';
import viewPost from './pages/viewPost'

// Font awesome stuff
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers, faQuestionCircle, faPencilAlt, faArrowCircleLeft, 
  faLock, faBell, faClock, faCalendar, faMapMarkerAlt, faCheck, faTimes, faSearch, faComment} from '@fortawesome/free-solid-svg-icons';

  axios.defaults.baseURL = 'https://australia-southeast1-garden-market-241b9.cloudfunctions.net/api'

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href='/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render(){
    library.add(faUsers, faQuestionCircle, faPencilAlt, faArrowCircleLeft, faLock, faBell, faClock, faCalendar, faMapMarkerAlt, faCheck, faTimes, faSearch, faComment);
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <NavBar/>
          
          <Switch>
            <Route exact path='/' component={browse}/>
            <AuthRoute exact path='/login' component={login} />
            <AuthRoute exact path='/signup' component={signup} />
            <Route exact path='/createpost' component={createPost} />
            <Route path='/post/:postId' component={viewPost}/>
            
          </Switch>
          <Footer/>
     </Router>
    </div>
    </Provider>
  );
  }
}

export default App;
