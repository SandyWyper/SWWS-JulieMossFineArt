import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import useScrollPosition from '../lib/useScrollPosition';
import pathify from '../lib/pathify';

import PropTypes from 'prop-types';
import HomeTitleLink from './homeTitleLink';
import ContactForm from '../components/contactForm';

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const Nav = ({ path }) => {
  const data = useStaticQuery(
    graphql`
      query {
        markdownRemark(fields: { slug: { eq: "/collections/" } }) {
          frontmatter {
            collections {
              title
            }
          }
        }
        allMarkdownRemark(filter: { fields: { slug: { regex: "/blog/" } } }, sort: { fields: [frontmatter___date], order: DESC }, limit: 2) {
          edges {
            node {
              id
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );
  // destructure data
  // const posts = data.allMarkdownRemark.edges;

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
    marginTop: isShown ? '0rem' : '-5.2rem',
    // opacity: isShown ? '1' : '0',
    config: { mass: 1, tension: 120, friction: 24, clamp: true },
  });

  return (
    <animated.nav style={showNavSpring} className="fixed inset-x-0 z-40 w-full bg-white">
      <div className="relative max-w-6xl mx-auto">
        <HomeTitleLink path={path} />
        <div className="absolute top-0 right-0 mt-2 md:mt-3">
          <button onClick={menuToggle} className={`hamburger hamburger--collapse relative ${isOpen && 'is-active'}`} type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>

          <animated.div className="fixed top-0 right-0 z-50 bg-white" style={spring}>
            <div className="relative flex flex-col justify-center w-screen h-screen p-10 ">
              <div className="flex w-full max-w-5xl mx-auto">
                <nav className="md:w-1/2 nav-styles lg:pl-24">
                  <ul className="nav-lists">
                    <li className="item">
                      <Link to="/" onClick={linkToggle} onKeyDown={handleKeyDown}>
                        Home
                      </Link>
                    </li>
                    <li className="item">
                      <Link to={pathify(data.markdownRemark.frontmatter.collections[0].title)} onClick={linkToggle} onKeyDown={handleKeyDown}>
                        View Work
                      </Link>
                    </li>
                    <li className="item">
                      <Link to="/about" onClick={linkToggle} onKeyDown={handleKeyDown}>
                        About
                      </Link>
                    </li>
                    <li className="item">
                      <Link to="/contact" onClick={linkToggle} onKeyDown={handleKeyDown}>
                        Get In Touch
                      </Link>
                    </li>
                    <li className="item">
                      <Link to="/blog" onClick={linkToggle} onKeyDown={handleKeyDown}>
                        Notes From The Studio
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="hidden lg:px-16 md:block md:w-1/2">
                  <ContactForm menuToggle={linkToggle} />
                </div>
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
