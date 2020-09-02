import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import NewsletterSignup from '../components/newsletterSignup';

const BlogTemplate = (props) => {
  const { next, prev } = props.pageContext;
  const { frontmatter, html } = props.data.markdownRemark;
  const sharingImage = props.data.markdownRemark.frontmatter.mainImage.image.publicURL;
  const sharingImageAlt = props.data.markdownRemark.frontmatter.mainImage.imageAlt;

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={sharingImage}
        url={props.location.href}
        imageAlt={sharingImageAlt}
      />
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

        <div className="w-full max-w-2xl mx-auto font-bold">
          {prev && (
            <Link to={prev} rel="prev" className="float-left">
              ← Previous Post
            </Link>
          )}
          {next && (
            <Link to={next} rel="next" className="float-right">
              Next Post →
            </Link>
          )}
        </div>
      </section>
      <hr />
      <section className="max-w-md px-4 mx-auto mb-16 text-center">
        <NewsletterSignup />
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
            publicURL
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
