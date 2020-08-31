import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import Img from 'gatsby-image';
import Footer from '../components/footer';

const About = (props) => {
  const { frontmatter, html } = props.data.markdownRemark;
  const { title, mainImage } = frontmatter;

  return (
    <>
      <SEO title={title} />
      <section className="max-w-5xl px-4 pt-24 mx-auto mb-24">
        <Img className="max-w-xl mx-auto mb-6" fluid={{ ...mainImage.image.childImageSharp.fluid }} alt={mainImage.imageAlt} />
        <h1 className="text-center h2">{title}</h1>
        <div className="max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
      <Footer />
    </>
  );
};

export const data = graphql`
  {
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      html
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
    }
  }
`;

About.propTypes = {
  data: PropTypes.object.isRequired,
};
export default About;
