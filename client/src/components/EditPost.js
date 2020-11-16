import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap'
import {connect} from 'react-redux';
import {editPostDetails} from '../redux/actions/dataActions'

 class EditPost extends Component {

  state = {
  
    category: "",
    description: "",
    image: "",
    isOrganic: "",
    title: "",
    price: "",
    unit: "",
    ready:"",
    open: false
  };

  mapPostDetailsToState = (post) =>{
    this.setState({
      postId: post.postId,
      category: post.category,
      description: post.description,
      image: post.image,
      isOrganic: post.isOrganic,
      title: post.title,
      price: post.price,
      unit: post.unit,
      ready:post.ready
    })
  }

  handleOpen =() => {
    this.setState({ open:true})
    this.mapPostDetailsToState(this.props.post)
  }
  handleClose = () => {
    this.setState({ open: false})
  }

  componentDidMount(){
   const {post} = this.props;
   this.mapPostDetailsToState(post)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  handleSubmit = () => {
    const postDetails ={
      postId: this.state.postId,
    category:this.state.category,
    description:this.state.description,
    image:this.state.image,
    isOrganic:this.state.isOrganic,
    title:this.state.title,
    price:this.state.price,
    unit:this.state.unit, 
    ready:this.state.ready
  };
  this.props.editPostDetails(this.props.postId, postDetails);
  this.handleClose();
}

  render() {
    return (
      <Fragment>
         <button 
      type="button" 
      className="btn btn-lg btn-post"
      onClick = {this.handleOpen}
      >Edit</button>

      <Modal show={this.state.open} onHide={this.handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit={this.handleSubmit}>
            <Row>
              {/* <!--Left Col--> */}
             
              <Col xs={12} md={6}>
              
                <Form.Group id="title-group"description="Enter the Food Item That You Are Listing">
                  <Form.Label >Title</Form.Label>
                  <Form.Control 
                  required
                  name="title" 
                  type="text" 
                  value={this.state.title}
                  placeholder="Enter Title" 
                  onChange={this.handleChange}/>
                 
                </Form.Group>

                <Form.Group  id="category-group" description="Please Enter the Food Category">
                <Form.Label >Category</Form.Label>
                  <Form.Control 
                  name="category" 
                  as="select" 
                  placeholder="Select Category"
                  value={this.state.category}
                  onChange={this.handleChange}>
                    <option value="fruit">Fruit</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="herbs">Herbs</option>
                    <option value="animal">Animal Products</option>
                    </Form.Control>
                </Form.Group>

             <Form.Group id="image-group" description="Please Enter a Valid Image URL">
             <Form.Label >Title</Form.Label>
                  <Form.Control 
                  name="image" 
                  type="text" 
                  value={this.state.image}
                  required placeholder="Enter image url" 
                  onChange={this.handleChange}/>
                 
                </Form.Group>

                <Form.Group >
                <Form.Label >Organic or Non Organic </Form.Label><br/>
                     <Form.Check 
                     name="isOrganic" 
                     value='organic'
                     label="Organic" 
                     inline 
                     type="radio" 
                     defaultChecked={this.state.isOrganic === 'organic'}
                     onChange={this.handleChange}/>
                     <Form.Check 
                     name="isOrganic" 
                     value='non organic'
                     label="Non Organic" 
                     inline  
                     type="radio"
                     defaultChecked={this.state.isOrganic === 'non organic'}
                     onChange={this.handleChange}
                     />
                       </Form.Group>
                        
              </Col>
              {/* <!--Right Col--> */}
              
              <Col xs={12} md={6}>
                <Form.Group >
                <Form.Label >Ready to Harvest? </Form.Label><br/>
                     <Form.Check
                     name="ready" 
                     label="Ready Now" 
                     inline  
                     type="radio"
                     value="ready now"
                     defaultChecked={this.state.ready === 'ready now'}
                     onChange={this.handleChange}
                     />
                     <Form.Check 
                     name="ready" 
                     label="Ready Soon" 
                     inline  
                     type="radio"
                     value="ready soon"
                     defaultChecked={this.state.ready === 'ready soon'}
                     onChange={this.handleChange}
                     />
                       </Form.Group>

                       <Row>
                         <Col xs={6}>
                  <Form.Group id="price-group">
                  <Form.Label >Price </Form.Label>
                <Form.Control 
                id="price" 
                onChange={this.handleChange} 
                value={this.state.price} 
                type="text" 
                name="price" 
                required placeholder="Enter price"/>
                 
                </Form.Group>
                  </Col>
                  <Col xs={6}>
                <Form.Group id="unit-group"  description="Enter an appropriate unit for price">
                <Form.Label>Unit</Form.Label>
                  <Form.Control 
                  onChange={this.handleChange} 
                  as="select" 
                  name="unit"
                  value={this.state.unit}>
                    <option value="1 kg">1 kg</option>
                    <option value="bunch">bunch</option>
                    <option value="dozen">dozen</option>
                    <option value="1/2 kg">1/2 kg</option>
                  </Form.Control>
                    
                  {/* <Form-invalid-feedback id="category-feedback">
                    This is a required field and must be at least 3 characters.
                  </Form-invalid-feedback>  */}
                </Form.Group>
                </Col>
                </Row>
                  <Form.Group id="description" description="Please enter general description, include if buyer must bring own bags/box for collection">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                  name="description" 
                  value={this.state.description}
                  onChange={this.handleChange} 
                  placeholder="Please enter a description, including whether the buyer should bring a box or bag for collection" 
                  as="textarea" 
                  rows={3}/>
                     
                    
                  </Form.Group>
                 
              </Col>
            </Row>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
           Update
          </Button>
        </Modal.Footer>
      </Modal>
        
      </Fragment>
    )
  }
}

EditPost.propTypes ={
  editPostDetails : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.data.post
})

export default connect(mapStateToProps, {editPostDetails})(EditPost)
