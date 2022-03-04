import React from 'react';
import { Link } from 'gatsby';
import SEO from '../components/seo';
import Footer from '../components/footer';
import Robot404 from '../components/Robot404';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <div className="relative min-h-screen">
      <section className="max-w-5xl px-4 pt-24 mx-auto md:flex">
        <div className="md:w-1/2">
          <h1 className="mb-0 opacity-50">NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <Link to="/" className="hidden md:block btn">
            home
          </Link>
        </div>
        <div className="md:w-1/2">
          <Robot404 classes="max-w-lg" />
          <Link to="/" className="md:hidden btn">
            home
          </Link>
        </div>
      </section>
    </div>
    <Footer />
  </>
);

export default NotFoundPage;
