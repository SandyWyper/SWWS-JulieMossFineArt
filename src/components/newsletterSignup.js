import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import PropTypes from 'prop-types';
import { emailIsValid } from '../lib/emailIsValid';

const NewsletterSignup = ({ path }) => {
  const [email, setEmail] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('ready');
  const [mailChimpResponse, setMailChimpResponse] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailIsValid(email)) {
      setSignupSuccess('invalid email');
      return;
    }

    addToMailchimp(email)
      .then((data) => {
        if (data.result === 'error') {
          setMailChimpResponse(data);
          setSignupSuccess('fail');
          return;
        } else if (data.result === 'success') {
          setMailChimpResponse(data);
          setSignupSuccess('success');
        }
      })
      .catch((error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        console.log(`error is: ${error}`);
        setSignupSuccess('fail');
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  const SignupSuccess = () => (
    <div className="mb-6 bg-green-200 ">
      <p className="p-4">Your email was added to my mailing list. Thanks, I really appreciate it.</p>
    </div>
  );

  const InvalidEmail = () => (
    <div className="mb-6 bg-red-300">
      <p className="p-4">Please enter a valid email address</p>
    </div>
  );

  const SignupFail = () => (
    <div className="mb-6 bg-red-300">
      <div className="p-4" dangerouslySetInnerHTML={{ __html: mailChimpResponse.msg }} />
    </div>
  );
  return (
    <form onSubmit={handleSubmit} className="newsletter-signup-form">
      <h5 className="mb-0 md:mb-2">Subscribe to my newsletter</h5>
      <p>From time to time I send out words on my latest news and musings.</p>
      <div className="mb-6">
        <input
          className={`${
            path === '/contact/' ? ' w-full ' : 'w-full md:w-2/3'
          } px-4 py-2 leading-tight border-2  mb-6 appearance-none focus:outline-none focus:border-gray-600`}
          placeholder="Email address"
          name="email"
          type="email"
          onChange={handleEmailChange}
          required
        />
        <button
          type="submit"
          className={`${
            path === '/contact/' ? ' w-full sm:w-1/2' : 'w-full md:w-1/3 md:shadow-none'
          } px-8 py-2 font-normal leading-tight border-2 bg-gray-300 shadow cursor-pointer  hover:opacity-75 focus:outline-none focus:bg-gray-900 focus:text-white`}
        >
          Subscribe
        </button>
      </div>
      <div>
        {signupSuccess === 'success' && <SignupSuccess />}
        {signupSuccess === 'fail' && <SignupFail />}
        {signupSuccess === 'invalid email' && <InvalidEmail />}
      </div>
    </form>
  );
};

NewsletterSignup.propTypes = {
  path: PropTypes.string,
};
NewsletterSignup.defaultProps = {
  path: '/',
};
export default NewsletterSignup;
