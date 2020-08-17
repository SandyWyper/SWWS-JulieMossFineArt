// This component wraps every page and persists through page navigation.
// See 'gatsby-config.js' transition-link set-up

import React, { useState, useEffect } from 'react';
import Nav from './nav';
import ArtworkNav from './artworkNav';
import PropTypes from 'prop-types';

const Index = ({ path, pageContext: { artworkNav }, children }) => {
  const [showArtworkNav, setShowingArtworkNav] = useState(false);

  useEffect(() => {
    const shouldShow = artworkNav === true || path === '/collections/';
    if (shouldShow !== showArtworkNav) setShowingArtworkNav(!showArtworkNav);
  }, [artworkNav, path, showArtworkNav]);

  return (
    <div className="relative min-h-screen">
      <Nav />
      <ArtworkNav show={showArtworkNav} />
      <main className="w-full">{children}</main>
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
