import React from 'react'
import logo from "../assests/2.JPG"

const Footer = () => {
  const date = new Date();
  return (
    <div className='footer mt-2'>
      <img src={logo} width="200" height="60" alt="" loading="lazy"></img>
      <p className='py-2 '>
        copyright { String.fromCharCode(169)}
        {' ' + date.getFullYear()}
      </p>
      
    </div>
  )
}

export default Footer