import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Footer from '../components/footer';

const BlogTemplate = (props) => {
  const { next, prev } = props.pageContext;
  const { frontmatter, html } = props.data.markdownRemark;

  return (
    <>
      <SEO title="Blog" description={`${frontmatter.title} / ${frontmatter.description}`} />
      <section className="max-w-5xl px-4 pt-24 mx-auto mb-24">
        <Img
          className="max-w-md mx-auto mb-4"
          fluid={frontmatter.mainImage.image.childImageSharp.fluid}
          alt={frontmatter.mainImage.imageAlt}
          loading="eager"
        />

        <article className="">
          <h3 className="text-center">{frontmatter.title}</h3>
          <p className="">{frontmatter.date}</p>

          <div className="max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        <div className="max-w-2xl mx-auto">
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
      </section>
      <Footer />
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
