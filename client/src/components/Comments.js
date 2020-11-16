import React, { Component, Fragment } from 'react';
import {Container, Row, Col, Button, Modal, Image} from 'react-bootstrap';
import PropTypes from 'prop-types';
import dayjs from 'dayjs'
// import {Link} from 'react-router-dom'


class Comments extends Component{

  render(){
    const { comments } =  this.props;
    return(
      
        <Container>
          {comments.map((comment) => {
            const {body, createdAt, userImage, username} = comment;
            return(
              <Fragment key={createdAt}>
                <Row>
                  <Col xs={4}>
                    <Image scr={userImage} className='commentImage'/>
                  </Col>
                  <Col xs={8}> 
                  <div className='commentData'>
                    <p>{username} {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</p>
                    <hr/>
                    <h4>{body}</h4>
                  </div>
                  </Col>
                </Row>
              </Fragment>
            )
          })}
        </Container>
      
    )
  }

}

Comments.propTypes={
  comments:PropTypes.array.isRequired
}

export default Comments