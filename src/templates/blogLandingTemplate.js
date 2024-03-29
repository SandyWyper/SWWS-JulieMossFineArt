import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import NewsletterSignup from '../components/newsletterSignup';
import Footer from '../components/footer';

const BlogList = (props) => {
  // render navigation between blog-listing pages if there are more then one.
  const { currentPage, numBlogPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numBlogPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();
  const featuredPost = props.data.allMarkdownRemark.edges[0].node;
  const posts = isFirst ? props.data.allMarkdownRemark.edges.filter((x, i) => i !== 0) : props.data.allMarkdownRemark.edges;
  const { description, title } = props.data.markdownRemark.frontmatter.myBlog;

  const LatestArticle = () => (
    <div className="max-w-2xl mx-auto">
      <div className="relative max-w-sm mx-auto sm:max-w-2xl">
        {/* <h6 className="absolute top-0 z-50 pt-1 pl-2 text-white">latest article</h6> */}
        <Link to={featuredPost.fields.slug} className="">
          <Img
            className="max-w-sm shadow-lg min-h-400"
            fluid={{ ...featuredPost.frontmatter.mainImage.image.childImageSharp.fluid, sizes: '(max-width: 501px) calc(100vw - 2rem), 450px' }}
            alt={featuredPost.frontmatter.mainImage.imageAlt}
          />
          <div className="absolute max-w-sm p-6 text-center bg-white shadow-md md:w-1/2 featured-blog-text">
            <h5 className="mb-2">{featuredPost.frontmatter.title}</h5>
            <p className="mb-2 text-sm">{featuredPost.frontmatter.description}</p>
            <p className="mx-auto mb-0 btn">read more ...</p>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <SEO title={title} description={description} url={props.location.href} />
      <div className="relative">
        <section className="max-w-6xl px-4 pt-24 mx-auto mb-32 text-center lg:px-10">
          <div className="max-w-lg mx-auto mb-20">
            <h1 className="mb-4">{title}</h1>
            <p className="text-base lg:text-lg">{description}</p>
          </div>

          <LatestArticle />
        </section>

        <section className="py-8 mb-12 bg-gray-300 lg:mb-24">
          <div className="max-w-6xl px-4 mx-auto lg:px-10">
            <div className="flex flex-wrap items-end mb-16 lg:mb-0">
              {posts.map(({ node }) => (
                <div key={node.id} className="relative w-full mb-12 md:px-4 sm:w-1/2 lg:w-1/3 ">
                  <Link to={node.fields.slug}>
                    <Img
                      className=""
                      fluid={{ ...node.frontmatter.mainImage.image.childImageSharp.fluid, sizes: '(max-width: 501px) calc(100vw - 2rem), 450px' }}
                      alt={node.frontmatter.mainImage.image.imageAlt}
                    />
                    <div className="w-full px-2 py-6 mt-4 text-center bg-white">
                      <h5 className="mb-2">{node.frontmatter.title}</h5>
                      <p className="mb-3 text-sm">{node.frontmatter.description}</p>
                      <p className="mx-auto mb-0 btn">read more ...</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto font-bold">
            {!isFirst && (
              <Link to={`/blog/${prevPage}`} rel="prev" className="float-left">
                ← Previous Page
              </Link>
            )}
            {!isLast && (
              <Link to={`/blog/${nextPage}`} rel="next" className="float-right">
                Next Page →
              </Link>
            )}
          </div>
        </section>

        <section className="max-w-md px-4 mx-auto mb-20 text-center">
          <NewsletterSignup />
        </section>
      </div>
      <Footer />
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
            description
            date(formatString: "DD/MM/YYYY")
            mainImage {
              imageAlt
              image {
                childImageSharp {
                  fluid(srcSetBreakpoints: [400, 500, 600, 700, 800, 1000, 1200]) {
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
