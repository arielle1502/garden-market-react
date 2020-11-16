import React, { Component, Fragment } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Post from '../components/Post';
import Profile from '../components/Profile';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions'


class browse extends Component {
  state= {
    posts:null
  }
    componentDidMount(){
     this.props.getPosts();
    }
  
    render() {
      const { posts, isLoading } = this.props.data;
      let recentPostsMarkup = !isLoading ? (
      posts.map((post) =>
       <Post post={post} key={post.postId}/>)
      ) : (<p>loading..</p>)
      return (
      
  <Container fluid>
    <Row className="outer-row browse">
      <Col xs={12} md={4} lg={3} id="sidebarMenu" className=" d-md-block browse" align-h="start">
        <div className="sidebar-sticky pt-3">
          {/* search input */}
             <Profile/>
          
            <div>
              <img fluid src="" alt=""  className="panel-img"></img>
                </div>   
                </div>
          </Col>
        {/* <!-- main section --> */}
        <Col cols="12" md="8" lg="9">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Latest</h1>
          </div>
       <Fragment>{recentPostsMarkup}</Fragment>
          
        </Col>
    </Row>
  </Container>

    )
  }
}
browse.propTypes ={
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, { getPosts })(browse)
