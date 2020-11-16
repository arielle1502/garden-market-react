import React, { Component } from 'react'
import { Form, Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

//redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

class login extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password:'',
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  }

  handleChange= (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {

    const {UI:{isLoading}} = this.props;
    const {errors} = this.state;

    return (
      <Container fluid>
    <Row className="justify-content-center">
      <Col xs={6} className="py-5">
        {/* <!--Login Bootstrap Card--> */}
        <Card className="text-center shadow-lg p-2 mt-5">
          <h4 slot="header" className="header m-3">Login</h4>
          <Form noValidate onSubmit={this.handleSubmit}>
          <Form.Control 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={this.state.email} 
          onChange={this.handleChange} 
          isValid={errors.email ? true : false}
          aria-describedby="emailerror"
          className="mb-3"
          />
          <Form.Text id="emailerror">{errors.email}</Form.Text>

          <Form.Control 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={this.state.password} 
          onChange={this.handleChange} 
          isValid={errors.password ? true : false}
          aria-describedby="passworderror"
          className="mb-3"
          />
          <Form.Text id="passworderror">{errors.password}</Form.Text>
        {errors.general &&(
          <p>{errors.general}</p>
        )}
          <Button type="submit" className="btn w-100" >
            Login <br/> {isLoading && (
              <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            )}
            </Button>
          <small>Don't have an account? Sign up <Link to="/signup">here</Link></small>
          </Form>
        </Card>
        {/* // <!-- /Login Bootstrap Card--> */}
      </Col>
    </Row>
  </Container>
    )
  }
}

login.propTypes = {
loginUser : PropTypes.func.isRequired,
user: PropTypes.object.isRequired,
UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(login)