import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Image, Form, InputGroup, ListGroup, Dropdown,DropdownButton, Button, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions'


class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  }
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  handleLogout = () => {
    this.props.logoutUser();
  }
  render() {
    const { user: { credentials: {imageUrl, email, city, username}, isLoading, authenticated}} = this.props;

    let profileMarkup = !isLoading ? (authenticated ? (
<Fragment>
      <InputGroup className="mb-2 search">
      <FormControl type="search" placeholder="Search"/>
      <InputGroup.Append>
      <FontAwesomeIcon icon='search' size='sm' />
    </InputGroup.Append>
   </InputGroup>
   <div className="circle justify-content-center">
  <Image src={imageUrl} alt=""  className="panel-image" roundedCircle fluid/>
    </div> 
    <Form.File 
    id="imageInput"
    onChange={this.handleImageChange}
    label="Custom file input"
    style={{display: "none"}}  
    custom
  />
  <div className="change-photo">
  <Button onClick={this.handleEditPicture} className="btn "> Change Photo</Button>
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
<div className="change-photo">
  <Button onClick={this.handleLogout} className="btn "> Logout</Button>
  </div>
  <ListGroup >
                 <ListGroup.Item className="panel-heading">
                   <h2>Filter Posts </h2>
                 </ListGroup.Item>
                 </ListGroup>
  <InputGroup className="mb-2 location">
                   <InputGroup.Prepend>
                      <b-icon icon="map"></b-icon>
                     </InputGroup.Prepend>
                       <FormControl type="search" placeholder="Location"></FormControl>
                    </InputGroup>
                   {/* <!-- end location search input-->
                   <!-- category dropdown --> */}
                    <DropdownButton block className="w-100 mb-2" id="dropdown-item-button"  title="Category">
           
             <b-icon icon="flower1" aria-hidden="true"></b-icon> Food Type
           <Dropdown.Menu>
           <Dropdown.Item>Vegetables</Dropdown.Item>
           <Dropdown.Item>Fruit</Dropdown.Item>
           <Dropdown.Item>Herbs</Dropdown.Item>
           <Dropdown.Item>Animal Products</Dropdown.Item>
           <Dropdown.Divider></Dropdown.Divider>
           </Dropdown.Menu>
         </DropdownButton>
                   {/* <!-- end category dropdown -->
                      <!-- km dropdown --> */}
                    <DropdownButton block className="mb-2 w-100"id="dropdown-item-button"  title="+km">
           
             <b-icon icon="geo-alt" aria-hidden="true"></b-icon> +km
          
             <Dropdown.Menu>
           <Dropdown.Item>Up to 5km</Dropdown.Item>
           <Dropdown.Item>Up to 10km</Dropdown.Item>
           <Dropdown.Item>Up to 15km</Dropdown.Item>
           <Dropdown.Item>Up to 20km</Dropdown.Item>
           <Dropdown.Divider></Dropdown.Divider>
           </Dropdown.Menu>
          
         </DropdownButton>
                   {/* <!-- end km dropdown -->
                     <!-- price dropdown --> */}
                    <DropdownButton block className="w-100 mb-2" id="dropdown-item-button"  title="Price">
           
             <b-icon icon="cash" aria-hidden="true"></b-icon> Price
           
             <Dropdown.Menu>
           <Dropdown.Item>Free</Dropdown.Item>
           <Dropdown.Item>Up to $5/Unit</Dropdown.Item>
           <Dropdown.Item>Up to $10/Unit</Dropdown.Item>
           <Dropdown.Divider></Dropdown.Divider>
           </Dropdown.Menu>
         </DropdownButton>
                   {/* <!-- end price dropdown --> */}
             <div>
            <Button block className="btn-filter">Filter</Button>
            </div>

</Fragment>
    ) : (<Fragment>
       <InputGroup className="mb-2 search">
      <FormControl type="search" placeholder="Search"></FormControl>
      <InputGroup.Append>
     <b-icon icon="search"></b-icon>
    </InputGroup.Append>
   </InputGroup>
      <ListGroup >
                 <ListGroup.Item className="panel-heading">
                   <h2>DISCOVER YOUR NEIGHBOUR'S BAKCYARD BOUNTY </h2>
                 </ListGroup.Item>
                 </ListGroup>
                
                 <InputGroup className="mb-2 location">
                   <InputGroup.Prepend>
                      <b-icon icon="map"></b-icon>
                     </InputGroup.Prepend>
                       <FormControl type="search" placeholder="Location"></FormControl>
                    </InputGroup>
                   {/* <!-- end location search input-->
                   <!-- category dropdown --> */}
                    <DropdownButton block className="w-100 mb-2" id="dropdown-item-button"  title="Category">
           
             <b-icon icon="flower1" aria-hidden="true"></b-icon> Food Type
           <Dropdown.Menu>
           <Dropdown.Item>Vegetables</Dropdown.Item>
           <Dropdown.Item>Fruit</Dropdown.Item>
           <Dropdown.Item>Herbs</Dropdown.Item>
           <Dropdown.Item>Animal Products</Dropdown.Item>
           <Dropdown.Divider></Dropdown.Divider>
           </Dropdown.Menu>
         </DropdownButton>
                   {/* <!-- end category dropdown -->
                      <!-- km dropdown --> */}
                    <DropdownButton block className="mb-2 w-100"id="dropdown-item-button"  title="+km">
           
             <b-icon icon="geo-alt" aria-hidden="true"></b-icon> +km
          
             <Dropdown.Menu>
           <Dropdown.Item>Up to 5km</Dropdown.Item>
           <Dropdown.Item>Up to 10km</Dropdown.Item>
           <Dropdown.Item>Up to 15km</Dropdown.Item>
           <Dropdown.Item>Up to 20km</Dropdown.Item>
           <Dropdown.Divider></Dropdown.Divider>
           </Dropdown.Menu>
          
         </DropdownButton>
                   {/* <!-- end km dropdown -->
                     <!-- price dropdown --> */}
                    <DropdownButton block className="w-100 mb-2" id="dropdown-item-button"  title="Price">
           
             <b-icon icon="cash" aria-hidden="true"></b-icon> Price
           
             <Dropdown.Menu>
           <Dropdown.Item>Free</Dropdown.Item>
           <Dropdown.Item>Up to $5/Unit</Dropdown.Item>
           <Dropdown.Item>Up to $10/Unit</Dropdown.Item>
           <Dropdown.Divider></Dropdown.Divider>
           </Dropdown.Menu>
         </DropdownButton>
                   {/* <!-- end price dropdown --> */}
             <div>
            <Button block className="btn-filter">Filter</Button>
            </div> 
            </Fragment>)) : (<p>Loading..</p>)

    return profileMarkup;
  }
}
const mapStateToProps = (state => ({
  user: state.user
}));

const mapActionsToProps = {
  logoutUser, uploadImage
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Profile)
