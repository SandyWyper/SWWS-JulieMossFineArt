import React, { useState, useLayoutEffect } from 'react';
import useScrollPosition from '../lib/useScrollPosition';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';

const HomeTitleLink = ({ path }) => {
  // for top nav hide and show
  const [isShown, setIsShown] = useState(true);

  useLayoutEffect(() => {
    if (path === '/') {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  }, [path]);

  // use scroll position to determine whether to show nav
  useScrollPosition(
    ({ currPos }) => {
      if ((path === '/') & (currPos.y > -300)) {
        setIsShown(false);
      } else if (isShown === false) {
        setIsShown(true);
      }
    },
    [isShown],
    undefined,
    undefined,
    1000
  );

  const showSpring = useSpring({
    opacity: isShown ? '1' : '0',
  });

  return (
    <animated.div style={showSpring}>
      <Link to="/" className="pl-4 home-link">
        Julie Moss
      </Link>
    </animated.div>
  );
};

HomeTitleLink.propTypes = {
  path: PropTypes.string.isRequired,
};

export default HomeTitleLink;
