import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import InstaIcon from '../icons/instagram';
import pathify from '../lib/pathify';

const Footer = () => {
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

  return (
    <footer className="bg-gray-900 border-t-2 border-gray-300">
      <div className="max-w-5xl p-6 mx-auto">
        <div className="mb-6 md:pt-6">
          <ul className="sm:text-center md:flex md:justify-around md:justify-evenly">
            <li className="mb-2">
              <Link to="/">Home</Link>
            </li>
            <li className="mb-2">
              <Link to={pathify(data.markdownRemark.frontmatter.collections[0].title)}>View Work</Link>
            </li>
            <li className="mb-2">
              <Link to="/about">About</Link>
            </li>
            <li className="mb-2">
              <Link to="/contact">Get In Touch</Link>
            </li>
            <li className="mb-2">
              <Link to="/blog"> Notes From The Studio</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center md:p-4 ">
          <a target="_blank" rel="noreferrer" href="https://www.instagram.com/juliemoss_/">
            <InstaIcon classes="w-8 text-white fill-current text-offwhite" />
          </a>
        </div>
      </div>
      <div className="max-w-5xl pb-2 mx-auto text-contrast">
        <div className="flex flex-col items-center justify-center text-xs font-light md:flex-row">
          © {new Date().getFullYear()}, Website by&nbsp;
          <a href="https://tinderboxwebsolutions.com" className="text-xs">
            Tinderbox Web Solutions
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
