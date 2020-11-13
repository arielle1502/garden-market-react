import React, { Component, Fragment } from 'react';
import {Nav, Navbar, Jumbotron} from 'react-bootstrap';
import logo from "../assests/2.JPG"
import {Link} from 'react-router-dom'
import jumbotron from '../assests/jumbotron.jpg'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const style= {
  backgroundImage: `url(${jumbotron})`
}

class NavBar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <Fragment>
      <Navbar collapseOnSelect expand='lg' sticky="top">
      <Nav.Item>
        <img src={logo} width="350" height="78" className="d-inline-block align-top" alt="" loading="lazy"></img>
      </Nav.Item>
      <Navbar.Toggle type="button" data-toggle="collapse" data-target="#responsive-navbar-nav" aria-controls="responsive-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="nav justify-content-center pr-5 d-flex w-100">
        <Nav.Item className="nav-item">
          <Link to="/" className="nav-link">Browse
          </Link>
        </Nav.Item>
        <Nav.Item className="nav-item">
          {authenticated ? <Link to="/createpost" className="nav-link">Sell
          </Link>: <Link to="/login" className="nav-link">Sell
          </Link>}
        
        </Nav.Item>
      </Nav>
      <Nav className="nav justify-content-end d-contents">
      {authenticated ? <FontAwesomeIcon icon='bell' size='lg' /> : 
       
       <Fragment>
       <Nav.Item className="nav-item login">
        <Link to="/login" className="nav-link">Login
          </Link>
        </Nav.Item>
        <Nav.Item className="nav-item signup">
        <Link to="/signup" className="nav-link">SignUp
          </Link>
        </Nav.Item></Fragment>}
      </Nav>
    
    </Navbar.Collapse>
    </Navbar>
    <Jumbotron className="justify-content-center" fluid style={style}>
    
      <h1>Browse Your Local <br/>Organic Homegrown Extras</h1>
      <p>
        This is a modified jumbotron that occupies the entire horizontal space of
        its parent.
      </p>
    
  </Jumbotron>
  </Fragment>
    )
  }
}
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NavBar)