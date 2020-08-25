import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const BlogTemplate = (props) => {
  const { next, prev } = props.pageContext;
  const { frontmatter, html } = props.data.markdownRemark;

  return (
    <>
      <SEO title="Blog" description={`${frontmatter.title} / ${frontmatter.description}`} />
      <section className="">
        <div className="" />
        <div className="">
          <div className="">
            <div>
              <div className="">
                <h2 className="">{frontmatter.title}</h2>

                <Img className="" fluid={frontmatter.mainImage.image.childImageSharp.fluid} alt={frontmatter.mainImage.imageAlt} loading="eager" />
                <div className="">
                  <p className="">{frontmatter.date}</p>
                </div>
              </div>
            </div>
          </div>

          <article className="" dangerouslySetInnerHTML={{ __html: html }} />
          <div>
            {prev && (
              <Link to={prev} rel="prev">
                ← Previous Post
              </Link>
            )}
            {next && (
              <Link to={next} rel="next">
                Next Post →
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        mainImage {
          imageAlt
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      html
    }
  }
`;
BlogTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogTemplate;
