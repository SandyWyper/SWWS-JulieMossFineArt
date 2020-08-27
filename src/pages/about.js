import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import Img from 'gatsby-image';

const About = (props) => {
  const { frontmatter, html } = props.data.markdownRemark;
  const { title, mainImage } = frontmatter;
  console.log(props);
  return (
    <>
      <SEO title={title} />
      <section className="max-w-5xl px-4 pt-10 mx-auto lg:pt-24">
        <Img className="max-w-xl mx-auto mb-4" fluid={{ ...mainImage.image.childImageSharp.fluid }} alt={mainImage.imageAlt} />

        <h1 className="mb-4 text-center">{title}</h1>
        <div className="max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
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
