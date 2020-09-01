import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { Link } from 'gatsby';
import ArtworkNavInner from './artworkNavInner';

const ArtworkNav = ({ show, path }) => {
  const navSpring = useSpring({
    opacity: show ? 1 : 0,
    // top: show ? '50%' : '60%',
    transform: show ? 'translate( 0%, 0% )' : 'translate( -100% , 0% )',
  });

  return (
    <div className="relative z-30 max-w-5xl mx-auto">
      <animated.div style={navSpring} className="bg-white art-nav">
        <div className="px-4">
          <Link to="/collections" className="heading">
            Collections
          </Link>
          <ArtworkNavInner path={path} />
        </div>
      </animated.div>
    </div>
  );
};

ArtworkNav.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ArtworkNav;
