import React from 'react'
import { Link} from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
    const handleMouseEnter = (type) => {
        // Handle mouse enter event for each image type
        console.log(`Mouse enter: ${type}`);
      };
    
      const handleMouseLeave = () => {
        // Handle mouse leave event for both images
        console.log('Mouse leave');
      };
    
  return (
    <div>
        
      <div className="image-container6">
        <div
          className="image-card"
          onMouseEnter={() => handleMouseEnter('tourist')}
          onMouseLeave={handleMouseLeave}
        >
          <img src="/images/signup.png" alt="Patient" />
          <div className='image-text-on'>
    <p>Tourist</p>
  </div>
          <div className="overlay-text">
            
          <Link className="btn" to="/t_register">Sign Up</Link>
          </div>
        </div>

        <div
          className="image-card"
          onMouseEnter={() => handleMouseEnter('medical')}
          onMouseLeave={handleMouseLeave}
        >
          <img src="/images/register.png" alt="Medical" />

<div className='image-text-on'>
<p>Medical Center</p>
</div>

          <div className="overlay-text">
           
          <Link className="btn" to="/medical">Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
