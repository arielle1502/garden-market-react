
import React, { Component, Fragment } from 'react';
import { Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {deletePost} from '../redux/actions/dataActions';
import PropTypes from 'prop-types'


export class DeletePost extends Component {

  state = {
    open:false
  };
  handleOpen = () => {
    this.setState({ open: true})
  };
  handleClose = () => {
    this.setState({ open: false})
  };
  deletePost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false})
  };

  render() {
    return (
      <Fragment>
      <button 
      type="button" 
      className="btn btn-lg btn-post"
      onClick = {this.handleOpen}
      >Delete</button>
      <Modal show={this.state.open} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.deletePost}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </Fragment>
    )
  }
}

DeletePost.propTypes= {
  deletePost: PropTypes.func.isRequired,
  postId : PropTypes.string.isRequired,
}

export default connect(null, {deletePost})(DeletePost)
