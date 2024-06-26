import React from 'react';
import './Information.css';
import { Link } from 'react-router-dom';
import Example from './Example'; // Import the Example component


const Information = () => {
  return (
    <div>
      {/* Content of Location component */}
      <div className="row w-100">
        <div className="map col-lg-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62794.755739475476!2d80.21465200975524!3d6.032933179754982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3c09c1e38e257%3A0x8be8b54b3d3e6e1f!2sGalle%2C%20Sri%20Lanka!5e0!3m2!1sen!2sin!4v1647592310053!5m2!1sen!2sin"
            className="w-100" height="600" width="600" allowFullScreen="" loading="lazy"></iframe>
        </div>
       
      </div>
     <div className='example'>
     < Example />
     </div>
      
    </div>
  );
}

export default Information;
