import React from 'react';

function Footer() {
  return (
    <footer className="mt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>Contact Information</h4>
            <p>Email: example@example.com</p>
            <p>Phone: (123) 456-7890</p>
            {/* Add more contact information here */}
          </div>
          <div className="col-md-4">
            <h4>Follow Us</h4>
            <p>
              <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </p>
            {/* Add more social media links here */}
          </div>
          <div className="col-md-4">
            {/* Additional information or links */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;