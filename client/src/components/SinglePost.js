import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import vegpost from '../assests/vegpost.png';
import postfruit from '../assests/postfruit.png';
import herbspost from '../assests/herbspost.png';
import postanimal from '../assests/postanimal.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
// import Comments from './Comments'



 class SinglePost extends Component {

  state = {
    open: false
  }
  handleOpen= () => {
    this.setState({open: true});
    this.props.getPost(this.props.postId)
  }
  

  handleClose = () => {
    this.setState({open:false})
  }

  render() {
dayjs.extend(relativeTime)
   
    
    const {post:{ category, createdAt, image, isOrganic, price, ready, title, unit, userCity, commentCount, description, comments }, UI:{isLoading}} = this.props

    let catIcon =  (category === 'fruit') ? <img src={postfruit} className="img-fluid" alt=""></img> : (category === 'vegetable') ? <img src={vegpost} className="img-fluid" alt=""></img> : (category === 'herbs') ? <img src={herbspost}className="img-fluid" alt=""></img> : <img src={postanimal} className="img-fluid" alt=""></img>

    let orgIcon = (isOrganic === 'organic' || 'true') ?  <FontAwesomeIcon icon='check' size='sm' /> : (isOrganic === 'non organic') ?  <FontAwesomeIcon icon='times' size='sm' /> : null

    return (
      
        <Container className="post-container">
         <Row className="post-row"  >
          {/* //  <!-- post image col --> */}
           <Col xs={12} lg={6} >
             <img className="post-image" src={image} alt=""></img>
           </Col>
           {/* <!-- end post image col -->

           <!-- post text col --> */}
           <Col xs={10} lg={5}>
          <h1 className="tbl-header">{title}</h1>
             <Row className="post-table-row">
               
                    <Col xs={1} className="tbl-icon">
                    <FontAwesomeIcon icon='calendar' size='sm' />
                     </Col>
                   <Col xs={5} className="tbl-text d-flex">{dayjs(createdAt).fromNow()}</Col>
                   <Col xs={1} className="tbl-icon">
                   <FontAwesomeIcon icon='clock' size='sm' />
                     </Col>
                   <Col xs={5} className="tbl-text">{ready}</Col>
              </Row> 

            <Row  className="post-table-row">
                   <Col xs={1} className="tbl-icon">
                   <FontAwesomeIcon icon='map-marker-alt' size='sm' />
                     </Col>
                   <Col xs={5} className="tbl-text">{userCity}</Col>
                    <Col xs={1} className="tbl-icon">
                     {orgIcon}
                     </Col>
                   <Col xs={5} className="tbl-text">{isOrganic}</Col>
               
              </Row>
              <Row  className="post-table-row">
                   <Col xs={1} className="tbl-icon">
                   <FontAwesomeIcon icon='comment' size='sm' />
                     </Col>
                     <Col xs={3} className="tbl-text">Comments: </Col>
                   <Col xs={2} className="tbl-text">{commentCount}</Col>
                   {/* <Col xs={5}> <button 
                      type="button" 
                      className="btn btn-post"
                      onClick = {this.handleOpen}
                      >View Comments</button></Col>
                    <Comments comments={comments}/>
                */}
              </Row>
            </Col>
            {/* <!-- end post text col -->

            <!-- post icon col --> */}
             <Col xs={2} lg={1} className="post-icon ">
             {catIcon}
            </Col>
            {/* <!-- end post icon col -->
            <!-- post bottom --> */}
            <Row className="align-items-center post-bottom">
              {/* <Col xs="4" className="price-bottom"><p>FREE</p></Col> */}
            <Col xs={4} className="price-bottom"><p>${price}/{unit}</p></Col>
             <Col xs={8} className="text-center post-descript">
              <p>{description}</p>
             </Col>
          </Row>
            {/* <!-- end post-bottom --> */}
             </Row>
             </Container>
      
    )
  }
}

SinglePost.propTypes ={
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI
})

const mapActionsToProps = {
  getPost
}

export default connect(mapStateToProps, mapActionsToProps)(SinglePost)