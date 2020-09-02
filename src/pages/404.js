import React from 'react';
import { Link } from 'gatsby';
import SEO from '../components/seo';
import Footer from '../components/footer';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <div className="relative min-h-screen footer-padding">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to="/">Go home ...</Link>
    </div>
    <Footer />
  </>
);

export default NotFoundPage;
