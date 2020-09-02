import React from 'react';
import SEO from '../components/seo';
import { Link } from 'gatsby';
import NewsletterSignup from '../components/newsletterSignup';

const Thankyou = () => (
  <>
    <SEO title="Thankyou" />
    <section className="max-w-5xl px-4 pt-24 mx-auto text-center">
      <div className="">
        <h1 className="mb-10">Thank you</h1>
        <p className="">
          Your message has been submitted successfully.
          <br />
          Thanks for getting in touch. I'll get back to you as soon as i can.
        </p>
        <Link to="/" className="btn">
          Return to home page
        </Link>
      </div>
    </section>
    <hr />
    <section className="max-w-md px-4 mx-auto mb-20 text-center">
      <NewsletterSignup />
    </section>
  </>
);

export default Thankyou;
