import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import useScrollPosition from '../lib/useScrollPosition';

import PropTypes from 'prop-types';
import HomeTitleLink from './homeTitleLink';

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const Nav = ({ path }) => {
  // Nav open or not state
  const [isOpen, setIsOpen] = useState(false);

  // two toggle method to allow for page fadeout animation when linking to a different page
  const menuToggle = () => setIsOpen(!isOpen);
  const linkToggle = async () => {
    await timeout(300);
    setIsOpen(!isOpen);
  };

  // nav bar at the top shown or not
  const [isShown, setIsShown] = useState(true);

  const handleKeyDown = ({ key }) => {
    switch (key) {
      case 'Escape':
        menuToggle();
        break;
      default:
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
  }, [isOpen]);

  const spring = useSpring({
    to: {
      opacity: !isOpen ? 0 : 1,
      width: !isOpen ? '0%' : '100%',
      // height: !isOpen ? '0%' : '100%',
      // zIndex: !isOpen ? -20 : 50,
      // display: !isOpen ? 'none' : 'block',
    },
  });

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const show = currPos.y > -60 || currPos.y > prevPos.y;
      if (show !== isShown) setIsShown(show);
    },
    [isShown],
    undefined,
    undefined,
    100
  );

  const showNavSpring = useSpring({
    marginTop: isShown ? '0rem' : '-4rem',
    config: { mass: 1, tension: 200, friction: 30 },
  });

  return (
    <animated.nav style={showNavSpring} className="fixed inset-x-0 z-40 w-full bg-white">
      <div className="relative max-w-5xl mx-auto">
        <HomeTitleLink path={path} />
        <div className="absolute top-0 right-0 mt-2 md:mt-3">
          <button onClick={menuToggle} className={`hamburger hamburger--collapse relative ${isOpen && 'is-active'}`} type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>

          <animated.div className="fixed top-0 right-0 z-50 bg-white" style={spring}>
            <div className="relative flex flex-col justify-center w-screen h-screen p-10">
              <div className="max-w-md mx-auto">
                {isOpen && <div className="absolute top-0 left-0 mt-8 ml-8"></div>}
                <ul className="text-2xl">
                  <li className="">
                    <Link to="/" onClick={linkToggle} onKeyDown={handleKeyDown}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections" onClick={linkToggle} onKeyDown={handleKeyDown}>
                      My Art
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" onClick={linkToggle} onKeyDown={handleKeyDown}>
                      Happenings
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={linkToggle} onKeyDown={handleKeyDown}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={linkToggle} onKeyDown={handleKeyDown}>
                      Get In Touch
                    </Link>
                  </li>
                  <li>
                    <Link to="/typography-test" onClick={linkToggle} onKeyDown={handleKeyDown}>
                      typography-test
                    </Link>
                  </li>
                </ul>
                {/* <ul>
              <li className="text-3xl text-primary">
              <Link to="/collections" onClick={toggle} onKeyDown={handleKeyDown}>
              Collections
              </Link>
              </li>
              {data.projects.edges.map((post) => (
                <li className="post" key={post.node.id}>
                <Link to={post.node.fields.slug} onClick={toggle} onKeyDown={handleKeyDown}>
                {post.node.frontmatter.title}
                </Link>
                </li>
                ))}
                <li className="pt-2 text-3xl text-primary">
                <Link to="/blog" onClick={toggle} onKeyDown={handleKeyDown}>
                Blog
                </Link>
                </li>
                {data.blog.edges.map((post) => (
                  <li className="post" key={post.node.id}>
                  <Link to={post.node.fields.slug} onClick={toggle} onKeyDown={handleKeyDown}>
                  {post.node.frontmatter.title}
                  </Link>
                  </li>
                  ))}
                  <li className="pt-2 text-3xl text-primary">
                  <Link to="/contact" onClick={toggle} onKeyDown={handleKeyDown}>
                  Contact
                  </Link>
                  </li>
                </ul> */}
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </animated.nav>
  );
};

Nav.propTypes = {
  path: PropTypes.string.isRequired,
};
export default Nav;
