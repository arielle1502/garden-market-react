import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, Button, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom'
// import Post from '../components/Post'
import lettuce from '../assests/lettuce.png';
import DeletePost from '../components/DeletePost';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


class viewPost extends Component {
  render() {
    const { user: { credentials: {imageUrl, email, city, username}, isLoading, authenticated}} = this.props;
    // postId={postId}
    const deleteButton = authenticated && username === username ? (<DeletePost />) : null

    return (
      
  <Container fluid>
    <Row className="outer-row">
      <Col xs={12} md={4} lg={3} id="sidebarMenu" className=" d-md-block viewpost" align-h="start">
        <div className="sidebar-sticky pt-3 justify-content-center">
        <Button>
        <Link to="/" className="btn-filter">Back To Browse</Link>
              </Button>
               {/* <!-- panel heading --> */}
               <div className="circle">
              <Image src={imageUrl} alt=""  className="panel-image" roundedCircle fluid/>
                </div> 
                 <ListGroup >
            <ListGroup.Item className="panel-author">
              <h2>{username} </h2>
            </ListGroup.Item>
            <ListGroup.Item className="panel-city justify-content-center d-flex">
            <b-icon icon="geo-alt" aria-hidden="true"></b-icon><h4>{city}</h4>
            </ListGroup.Item>
            <ListGroup.Item className="panel-contact justify-content-center d-flex">
            <b-icon icon="chat-text-fill" aria-hidden="true"></b-icon><h5>{email}</h5>
            </ListGroup.Item>
            </ListGroup>
            <div className="center-lettuce">
              <Image src={lettuce} alt=""  className="panel-img"/>
                </div>  
            </div>  
             
          </Col>
        {/* <!-- main section --> */}
        <Col cols="12" md="8" lg="9">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{username}'s post</h1>
          <span className="d-flex">
           <Link to="'/browse/' + post.id + '/edit'" type="button" className="btn btn-lg btn-post">Edit</Link>
          {deleteButton}
          </span>
          </div>
       {/* <Post/> */}
          
        </Col>
    </Row>
  </Container>

    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated
})

viewPost.propTypes ={
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(viewPost)