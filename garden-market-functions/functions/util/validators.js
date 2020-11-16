const isEmpty = (string) => {
  if(string.trim() === '') return true;
  else return false;
}


exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if(!isEmpty(data.city.trim())) userDetails.city = data.city;
  if(!isEmpty(data.street.trim())) userDetails.street = data.street;
  if(!isEmpty(data.state.trim())) userDetails.state = data.state;
  if(!isEmpty(data.postal.trim())) userDetails.postal = data.postal;

  return userDetails;
}

exports.validateSignupData = (data) => {
  
  let errors = {};
  if(isEmpty(data.email)) errors.email = 'Must not be empty';
  if(isEmpty(data.username)) errors.username = 'Must not be empty';
  if(isEmpty(data.password)) errors.password = 'Must not be empty';
  if(isEmpty(data.city)) errors.city = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateLoginData = (data) => {
  let errors = {};

  if(isEmpty(data.email)) errors.email = 'Must not be empty';
  if(isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}