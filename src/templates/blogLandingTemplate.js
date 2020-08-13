import React from 'react';
import { Link, graphql } from 'gatsby';

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

  return (
    <>
      <SEO title="Blog" description="XXXXXXX" />
      <section className="">
        <div className="" />
        <div className="">
          {/* {isFirst && (
            <FeaturedArticle
              articleDetails={featuredPost.frontmatter}
              path={featuredPost.fields.slug}
            />
          )} */}
          <hr />
          <h1>Blog</h1>
          <h2>Latest blog: {featuredPost.frontmatter.title}</h2>
          <div className="">
            {posts.map(({ node }, index) => (
              <div key={node.id}>
                {/* <ArticleCard
                  articleDetails={node.frontmatter}
                  path={node.fields.slug}
                /> */}
                <h3>{node.frontmatter.title}</h3>
                {index !== posts.length - 1 && <hr key={`${node.id}-hr`} />}
              </div>
            ))}
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
        </div>
      </section>
    </>
  );
};

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(filter: { fields: { slug: { regex: "/blog/" } } }, sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD/MM/YYYY")
          }
          fields {
            slug
          }
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
