import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    addToMailchimp(email)
      .then((data) => {
        // improve this....
        alert(data.result);
      })
      .catch((error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        console.log(`error is: ${error}`);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Subscribe to my email list!</h2>
      <p>Stay up to date with my latest goings on.</p>
      <div className="">
        <input placeholder="Email address" name="email" type="text" onChange={handleEmailChange} />
        <button type="submit">Subscribe</button>
      </div>
    </form>
  );
};

export default NewsletterSignup;
