import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import useScrollPosition from '../lib/useScrollPosition';
import pathify from '../lib/pathify';

import PropTypes from 'prop-types';
import HomeTitleLink from './homeTitleLink';

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
  const { collections } = data.markdownRemark.frontmatter;
  const posts = data.allMarkdownRemark.edges;

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
    console.log(key);
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
    marginTop: isShown ? '0rem' : '-5.2rem',
    // opacity: isShown ? '1' : '0',
    config: { mass: 1, tension: 120, friction: 24, clamp: true },
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
            <div className="relative flex flex-col justify-center w-screen h-screen p-10 ">
              <div className="w-full max-w-5xl mx-auto">
                <nav className="max-w-lg nav-styles lg:pl-24">
                  {/* {isOpen && <div className="absolute top-0 left-0 mt-8 ml-8"></div>} */}
                  <ul>
                    <li className="item">
                      <Link to="/" onClick={linkToggle} onKeyDown={handleKeyDown}>
                        Home
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
                  </ul>
                  <ul>
                    <li className="item">
                      <Link to="/collections" onClick={linkToggle} onKeyDown={handleKeyDown}>
                        My Art
                      </Link>
                      <ul>
                        {collections.slice(0, 3).map((collection, i) => (
                          <li key={`${i}-${collection.title}`}>
                            <Link className="sub-link" to={pathify(collection.title)} onClick={linkToggle} onKeyDown={handleKeyDown}>
                              {collection.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="item">
                      <Link to="/blog" onClick={linkToggle} onKeyDown={handleKeyDown}>
                        Happenings
                      </Link>
                      <ul>
                        {posts.map((post, i) => (
                          <li key={post.node.id}>
                            <Link className="sub-link" to={post.node.fields.slug} onClick={linkToggle} onKeyDown={handleKeyDown}>
                              {post.node.frontmatter.title}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link className="sub-link" to="/blog" onClick={linkToggle} onKeyDown={handleKeyDown}>
                            more ...
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
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
