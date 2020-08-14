import React from 'react';
import Link from 'gatsby-plugin-transition-link';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link to="/">Go home ...</Link>
  </Layout>
);

export default NotFoundPage;
