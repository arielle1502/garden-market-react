import React, { Component } from 'react'
import { Form, Container, Row, Col, Button, Card } from 'react-bootstrap'

class createPost extends Component {
  render() {
    return (
      <Container fluid>
    <Row className="justify-content-center">
      <Col xs={8} className="py-5">
        {/* <!--Login Bootstrap Card--> */}
        <Card className="text-center shadow-lg p-4 mt-5">
          <h2 className="new-post-heading">Create a New Post</h2>
        <Form>
            <Row>
              {/* <!--Left Col--> */}
             
              <Col xs={12} md={6}>
                <Form.Group id="title-group"description="Enter the Food Item That You Are Listing">
                  <Form.Label >Title</Form.Label>
                  <Form.Control id="title" type="text" required placeholder="Enter Title"/>
                  {/* <Form-invalid-feedback id="title-feedback">
                    This is a required field and must be at least 3 characters.
                  </Form-invalid-feedback> */}
                </Form.Group>

                <Form.Group id="category-group" description="Please Enter the Food Category">
                <Form.Label >Category</Form.Label>
                  <Form.Control as="select" defaultValue="Category">
                    <option>Fruit</option>
                    <option>Vegetable</option>
                    <option>Herbs</option>
                    <option>Animal Products</option>
                    </Form.Control>
                </Form.Group>

             <Form.Group id="image-group" description="Please Enter a Valid Image URL">
             <Form.File id="exampleFormControlFile1" label="Image for Post" />
                  {/* <Form-invalid-feedback id="image-feedback">
                    This is a required field and must be at least 3 characters.
                  </Form-invalid-feedback>  */}
                </Form.Group>

                <Form.Group >
                <Form.Label >Organic or Non Organic </Form.Label><br/>
                     <Form.Check name="organic" label="Organic" inline type="radio"/>
                     <Form.Check name="non organic" label="Non Organic" inline  type="radio"/>
                       </Form.Group>
                        
              </Col>
              {/* <!--Right Col--> */}
              <Col xs={12} md={6}>
                <Form.Group >
                <Form.Label >Ready to Harvest? </Form.Label><br/>
                     <Form.Check className="form-check form-check-inline" name="ready" label="Ready Now" inline  type="radio"/>
                     <Form.Check className="form-check form-check-inline" name="not ready" label="Ready Soon" inline  type="radio"/>
                       </Form.Group>

                       <Row>
                         <Col xs={6}>
                  <Form.Group id="price-group">
                  <Form.Label >Price </Form.Label>
                <Form.Control id="price" type="text" required placeholder="Enter price"/>
                  {/* <Form-invalid-feedback id="category-feedback">
                    This is a required field and must be at least 3 characters.
                  </Form-invalid-feedback>  */}
                </Form.Group>
                  </Col>
                  <Col xs={6}>
                <Form.Group id="unit-group" description="Enter an appropriate unit for price">
                <Form.Label>Unit</Form.Label>
                  <Form.Control as="select" defaultValue="Unit for Price">
                    <option>1 kg</option>
                    <option>bunch</option>
                    <option>dozen</option>
                    <option>1/2 kg</option>
                  </Form.Control>
                    
                  {/* <Form-invalid-feedback id="category-feedback">
                    This is a required field and must be at least 3 characters.
                  </Form-invalid-feedback>  */}
                </Form.Group>
                </Col>
                </Row>
                  <Form.Group id="description" description="Please enter general description, include if buyer must bring own bags/box for collection">
                  <Form.Label>Description</Form.Label>
                  <Form.Control placeholder="Please enter a description, including whether the buyer should bring a box or bag for collection" as="textarea" rows={3}/>
                     
                    {/* <Form-invalid-feedback id="equipment-feedback">
                      This is a required field and must be at least 3 characters.
                    </Form-invalid-feedback> */}
                  </Form.Group>
                 
              </Col>
              <Col xs={12}>
                <Button  className="w-100 form-submit" >Submit</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        {/* // <!-- /Login Bootstrap Card--> */}
      </Col>
    </Row>
  </Container>
    )
  }
}

export default createPost