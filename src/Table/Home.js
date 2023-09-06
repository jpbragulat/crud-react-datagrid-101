import React from 'react';
import image1 from './img/cessna152.jpg'

function Home() {
  return (
    <div>
      <h3>Welcome to Flight School!</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        vestibulum, metus at cursus euismod, arcu magna tempor neque, eget
        varius justo est vel eros. Sed facilisis id ante sit amet tristique.
        Nullam in quam quis urna facilisis efficitur.
      </p>
      <img
        src={image1} // Replace with the URL of your image
        alt="Flight School"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}

export default Home;