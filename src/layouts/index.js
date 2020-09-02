import React, { useState, useEffect } from 'react';
import Nav from './nav';
import ArtworkNav from './artworkNav';
import PropTypes from 'prop-types';
import { TransitionProvider, TransitionViews } from 'gatsby-plugin-transitions';
import Footer from '../components/footer';
const Index = ({ path, pageContext: { artworkNav }, children, location }) => {
  const [showArtworkNav, setShowingArtworkNav] = useState(false);

  useEffect(() => {
    const shouldShow = artworkNav === true;
    if (shouldShow !== showArtworkNav) setShowingArtworkNav(!showArtworkNav);
  }, [artworkNav, path, showArtworkNav]);

  return (
    <div className="relative min-h-screen mx-auto overflow-hidden footer-padding">
      <TransitionProvider
        location={location}
        enter={{
          opacity: 0,
          config: { duration: 600 },
        }}
        leave={{
          opacity: 0,
          config: { duration: 200 },
        }}
        usual={{
          opacity: 1,
        }}
      >
        <Nav path={path} />
        <ArtworkNav show={showArtworkNav} path={path} />
        <main>
          <TransitionViews>{children}</TransitionViews>
        </main>
      </TransitionProvider>
      <Footer />
    </div>
  );
};

Index.propTypes = {
  path: PropTypes.string.isRequired,
  artworkNav: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Index.defaultProps = {
  path: '/',
  artworkNav: false,
};

export default Index;
