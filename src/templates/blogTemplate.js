import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import NewsletterSignup from '../components/newsletterSignup';
import Footer from '../components/footer';

const BlogTemplate = (props) => {
  const { next, prev } = props.pageContext;
  const { frontmatter, html } = props.data.markdownRemark;
  const sharingImage = props.data.markdownRemark.frontmatter.mainImage.image
    ? props.data.markdownRemark.frontmatter.mainImage.image.childImageSharp.resize.src
    : null;

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description.slice(0, 160)}
        image={sharingImage}
        url={props.location.href}
        imageAlt={frontmatter.mainImage.imageAlt}
      />
      <div className="relative min-h-screen footer-padding">
        <section className="max-w-5xl px-4 pt-24 mx-auto mb-24">
          {frontmatter.mainImage.image && (
            <Img
              className="max-w-md mx-auto mb-4"
              fluid={{
                ...frontmatter.mainImage.image.childImageSharp.fluid,
                sizes: '(max-width: 501px) calc(100vw - 2rem), 550px',
              }}
              alt={frontmatter.mainImage.imageAlt}
              loading="eager"
            />
          )}

          <article>
            <h3 className="text-center">{frontmatter.title}</h3>
            <p>{frontmatter.date}</p>

            <div className="max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: html }} />
          </article>

          <div className="w-full max-w-2xl mx-auto font-normal">
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
      </div>
      <Footer />
    </>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        description
        title
        mainImage {
          imageAlt
          image {
            childImageSharp {
              fluid(srcSetBreakpoints: [400, 500, 600, 700, 800, 1000, 1200]) {
                ...GatsbyImageSharpFluid_withWebp
              }
              resize(width: 800) {
                src
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
