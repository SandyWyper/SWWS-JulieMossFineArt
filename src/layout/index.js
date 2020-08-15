// This component wraps every page and persists through page navigation.
// See 'gatsby-config.js' transition-link set-up

import React, { useState, useEffect } from 'react';
import Nav from './nav';
import ArtworkNav from './artworkNav';

const Index = (props) => {
  const [showArtworkNav, setShowingArtworkNav] = useState(false);
  const { path, pageContext } = props;

  useEffect(() => {
    const shouldShow = pageContext.artworkNav === true || path === '/collections/';
    if (shouldShow !== showArtworkNav) {
      setShowingArtworkNav(!showArtworkNav);
    }
  }, [pageContext.artworkNav, path, showArtworkNav]);

  return (
    <div className="relative h-screen bg-red-200">
      <Nav />
      <ArtworkNav show={showArtworkNav} />
      <main className="w-full">{props.children}</main>
    </div>
  );
};

export default Index;
