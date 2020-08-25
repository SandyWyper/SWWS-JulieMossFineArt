import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { Link } from 'gatsby';
import ArtworkNavInner from './artworkNavInner';

const ArtworkNav = ({ show, path }) => {
  const navSpring = useSpring({
    opacity: show ? 1 : 0,
    top: show ? '50%' : '60%',
    display: show ? 'block' : 'none',
  });

  return (
    <animated.div style={navSpring} className="z-30 bg-white art-nav">
      <div className="p-4">
        <Link to="/collections">My Art</Link>
        <ArtworkNavInner path={path} />
      </div>
    </animated.div>
  );
};

ArtworkNav.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ArtworkNav;
