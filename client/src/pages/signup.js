import React, { Component } from 'react';
import { Form, Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


//redux
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions'


class signup extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password:'',
      username:'',
      city: '',
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({errors: nextProps.UI.errors});
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading:true
    });
    
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      city: this.state.city
    };
    this.props.signupUser(newUserData, this.props.history);
  }

  handleChange= (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { UI: {isLoading}} = this.props;
    const {errors} = this.state;
    return (
      <Container fluid>
      <Row className="justify-content-center">
        <Col xs={6} className="py-5">
          {/* <!--signup Bootstrap Card--> */}
          <Card className="text-center shadow-lg p-2 mt-5">
            <h4 slot="header" className="header m-3">Sign Up</h4>
            <Form noValidate onSubmit={this.handleSubmit}>
            <Form.Control 
            type="email" 
            name="email" 
            placeholder="Email" 
            className="mb-3"
            value={this.state.email} 
            onChange={this.handleChange} 
            error={errors.email ? true : false}
            aria-describedby="emailerror">
            </Form.Control>
            <Form.Text id="emailerror">{errors.email}</Form.Text>

            <Form.Control 
            type="password" 
            name="password" 
            placeholder="Password" 
            className="mb-3"
            value={this.state.password} 
            onChange={this.handleChange} 
            error={errors.password ? true : false}
            aria-describedby="passworderror">
            </Form.Control>
            <Form.Text id="emailerror">{errors.password}</Form.Text>
        {/* {errors.general &&(
          <p>{errors.general}</p>
        )} */}

            <Form.Control 
            type="text" 
            name="username" 
            placeholder="Username" 
            className="mb-3"
            value={this.state.username} 
            onChange={this.handleChange} 
            error={errors.username ? true : false}
            aria-describedby="passworderror">
            </Form.Control>
            <Form.Text id="passworderror">{errors.username}</Form.Text>

            <Form.Control 
            type="text" 
            name="city" 
            placeholder="City" 
            className="mb-3"
            value={this.state.city} 
            onChange={this.handleChange} 
            error={errors.city ? true : false}
            aria-describedby="cityerror">
            </Form.Control>
            <Form.Text id="cityerror">{errors.city}</Form.Text>
       
            <Button type="submit" className="btn w-100" >Sign Up
            <br/> {isLoading && (
              <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            )}
            </Button>
            <small>Already have an account? Login <Link to="/login">here</Link></small>
            </Form>
          </Card>
          {/* // <!-- /Login Bootstrap Card--> */}
        </Col>
      </Row>
    </Container>
    )
  }
}

signup.propTypes ={
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,

}

const mapStateToProps= (state) => ({
  user: state.user,
  UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(signup)