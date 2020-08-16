import React, { useState, useEffect } from 'react';
import Link from 'gatsby-plugin-transition-link';
import { useSpring, animated } from 'react-spring';
// import PropTypes from 'prop-types';

const Nav = ({ data }) => {
  // Nav open or not state
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleKeyDown = ({ key }) => {
    switch (key) {
      case 'Escape':
        toggle();
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
      height: !isOpen ? '0%' : '100%',
    },
  });

  return (
    <div className="absolute top-0 right-0 mt-1">
      <button onClick={toggle} className={`hamburger hamburger--collapse relative ${isOpen && 'is-active'}`} type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>

      <animated.div className="fixed top-0 right-0 z-10 bg-white" style={spring}>
        <div className="relative flex flex-col justify-center w-screen h-screen p-10">
          <div className="max-w-md mx-auto">
            {isOpen && <div className="absolute top-0 left-0 mt-8 ml-8"></div>}
            <ul className="text-2xl">
              <li className="">
                <Link to="/" onClick={toggle} onKeyDown={handleKeyDown}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" onClick={toggle} onKeyDown={handleKeyDown}>
                  My Art
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={toggle} onKeyDown={handleKeyDown}>
                  Happenings
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggle} onKeyDown={handleKeyDown}>
                  Get In Touch
                </Link>
              </li>
              <li>
                <Link to="/typography-test" onClick={toggle} onKeyDown={handleKeyDown}>
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
  );
};
// Nav.propTypes = {
//   data: PropTypes.object.isRequired,
// };
export default Nav;
