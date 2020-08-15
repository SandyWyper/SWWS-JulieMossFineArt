import React from 'react';
import SEO from '../components/seo';
import Link from 'gatsby-plugin-transition-link';

const Thankyou = () => (
  <>
    <SEO title="Thankyou" />
    <section className="">
      <div className="" />
      <div className="">
        <p className="">
          Your message has been submitted successfully.
          <br />
          Thanks for getting in touch. I'll get back to you as soon as i can.
        </p>
        <Link to="/" className="">
          Return to home page
        </Link>
      </div>
    </section>
  </>
);

export default Thankyou;
