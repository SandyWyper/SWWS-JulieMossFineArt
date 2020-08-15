import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import Link from 'gatsby-plugin-transition-link';
import ArtworkNavInner from './artworkNavInner';

const ArtworkNav = ({ show }) => {
  const navSpring = useSpring({
    opacity: show ? 1 : 0,
    top: show ? '50%' : '60%',
  });

  return (
    <animated.div style={navSpring} className="art-nav">
      <div className="p-8">
        <h1>This is artwork nav</h1>
        <Link to="/collections">My Art</Link>
        <ArtworkNavInner />
      </div>
    </animated.div>
  );
};

ArtworkNav.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ArtworkNav;
