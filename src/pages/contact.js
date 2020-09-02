import React from 'react';
import NewsletterSignup from '../components/newsletterSignup';
import SEO from '../components/seo';
import ContactForm from '../components/contactForm';
import Footer from '../components/footer';

const Contact = (props) => {
  return (
    <>
      <SEO title="Contact" description="I would love to hear from you, so please do get in touch." url={props.location.href} />
      <div className="relative min-h-screen footer-padding">
        <section className="max-w-5xl px-4 pt-24 mx-auto mb-24">
          <h1 className="text-center md:mb-12">Contact</h1>
          <div className="md:divide-x-2 md:flex">
            <div className="md:w-1/2 lg:pl-16 md:pr-6">
              <ContactForm />
            </div>
            <div className="md:w-1/2 md:pl-6 md:pr-16">
              <hr className="md:hidden" />
              <NewsletterSignup path={props.path} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
