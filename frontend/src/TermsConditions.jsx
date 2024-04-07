// TermsConditions.jsx
import React from 'react';
import './TermsConditions.css'; // Import the CSS file for Terms & Conditions component
import Header from './Header';
import Footer from './Footer';

const TermsConditions = () => {
  return (
    <div>
        <Header/>
    <div className="terms-conditions">
      <h1>Terms & Conditions</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec lectus quis nisi hendrerit consequat. Duis quis diam nec turpis malesuada gravida vel vel enim. Duis rutrum metus sed libero ultricies commodo. Ut euismod lacus non ligula fringilla, sit amet placerat nulla blandit.
      </p>
      <p>
        Nam consequat felis sit amet consequat laoreet. Nullam in urna lectus. Integer porttitor pharetra lacus nec tincidunt. Nulla nec neque quis dui dapibus consectetur sed vitae lorem. Sed et velit vehicula, malesuada nulla vitae, sagittis lacus.
      </p>
      <p>
        Proin nec urna quis lacus laoreet consectetur. Nullam eleifend dui non mi bibendum, nec dapibus purus placerat. Mauris hendrerit nisi non orci mattis, nec ultricies nulla dignissim. Fusce dignissim felis non enim laoreet, in congue ipsum tempus.
      </p>
    </div>
    <Footer/>
    </div>
  );
};

export default TermsConditions;
