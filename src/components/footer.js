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
  // destructure data
  const { collections } = data.markdownRemark.frontmatter;
  const posts = data.allMarkdownRemark.edges;

  return (
    <footer className="absolute inset-x-0 bottom-0 w-full bg-gray-900 border-t-2 border-gray-300">
      <div className="max-w-5xl p-6 mx-auto lg:flex">
        <div className="sm:grid sm:grid-cols-12 sm:mb-4">
          <ul className="sm:col-start-1 sm:col-span-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Get In Touch</Link>
            </li>
          </ul>
          <ul className="mb-2 sm:col-start-3 sm:col-span-4">
            <li>
              <Link to="/collections">Art</Link>
              <ul>
                {collections.slice(0, 3).map((collection, i) => (
                  <li key={`${i}-${collection.title}`}>
                    <Link className="sub-link" to={pathify(collection.title)}>
                      {collection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className="mb-2 sm:col-start-7 sm:col-span-4">
            <li>
              <Link to="/blog">Blog</Link>
              <ul>
                {posts.map((post, i) => (
                  <li key={post.node.id}>
                    <Link className="sub-link" to={post.node.fields.slug}>
                      {post.node.frontmatter.title.slice(0, 39)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className="sub-link" to="/blog">
                    more ...
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex justify-center md:p-4 ">
          <a target="_blank" rel="noreferrer" href="https://www.instagram.com/juliemoss_/">
            <InstaIcon classes="w-8 text-white fill-current text-offwhite" />
          </a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto text-contrast">
        <div className="flex flex-col items-center justify-center font-light md:flex-row">
          © {new Date().getFullYear()}, Website by&nbsp;
          <a href="https://tinderboxwebsolutions.com" className="text-lg">
            Tinderbox Web Solutions
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
