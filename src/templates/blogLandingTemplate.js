import React from 'react';
import { graphql, Link } from 'gatsby';

import Img from 'gatsby-image';
import PropTypes from 'prop-types';

import SEO from '../components/seo';

const BlogList = (props) => {
  // render navigation between blog-listing pages if there are more then one.
  const { currentPage, numBlogPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numBlogPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  const featuredPost = props.data.allMarkdownRemark.edges[0].node;
  const posts = isFirst ? props.data.allMarkdownRemark.edges.filter((x, i) => i !== 0) : props.data.allMarkdownRemark.edges;
  console.log(featuredPost);
  const { description, title } = props.data.markdownRemark.frontmatter.myBlog;
  return (
    <>
      <SEO title="Blog" description="XXXXXXX" />
      <section className="max-w-5xl px-4 pt-12 mx-auto text-center lg:pt-24">
        <div className="max-w-md mx-auto ">
          <h1 className="mb-4">{title}</h1>
          <p className="text-lg">{description}</p>
        </div>
        <div>
          <Link to={featuredPost.fields.slug}>
            <h2>{featuredPost.frontmatter.title}</h2>
          </Link>
          <Img
            className="w-64 shadow-xl"
            fluid={{ ...featuredPost.frontmatter.mainImage.image.childImageSharp.fluid }}
            alt={featuredPost.frontmatter.mainImage.imageAlt}
          />
          <p>{featuredPost.frontmatter.description}</p>
        </div>
        <div className="">
          {posts.map(({ node }, index) => {
            return (
              <div key={node.id}>
                <Link to={node.fields.slug}>
                  <h3>{node.frontmatter.title}</h3>
                </Link>
                {index !== posts.length - 1 && <hr key={`${node.id}-hr`} />}
              </div>
            );
          })}
          {!isFirst && (
            <Link to={`/projects/${prevPage}`} rel="prev">
              ← Previous Page
            </Link>
          )}
          {!isLast && (
            <Link to={`/projects/${nextPage}`} rel="next">
              Next Page →
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/blog/" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            date(formatString: "DD/MM/YYYY")
            mainImage {
              imageAlt
              image {
                childImageSharp {
                  fluid(maxWidth: 1500) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: "/home/" } }) {
      frontmatter {
        myBlog {
          description
          title
        }
      }
    }
  }
`;

BlogList.propTypes = {
  pageContext: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default BlogList;
