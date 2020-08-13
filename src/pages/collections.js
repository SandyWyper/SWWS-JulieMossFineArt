import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import Img from 'gatsby-image';

const Collections = (props) => {
  const { heading, subheading, title, collections } = props.data.markdownRemark.frontmatter;
  console.log(props);
  return (
    <>
      <SEO title={title} description="XXXXXXX" />
      <section className="">
        <h1>{heading}</h1>
        <h4>{subheading}</h4>
        <div>
          {collections.map((collection) => {
            return (
              <div key={`${collection.title}-container`}>
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <Img className="" fluid={{ ...collection.image1.image.childImageSharp.fluid, sizes: '400px' }} alt={collection.image1.alt} />
                <Img className="" fluid={{ ...collection.image2.image.childImageSharp.fluid, sizes: '400px' }} alt={collection.image2.alt} />
                <Img className="" fluid={{ ...collection.image3.image.childImageSharp.fluid, sizes: '400px' }} alt={collection.image3.alt} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export const pageData = graphql`
  {
    markdownRemark(fields: { slug: { eq: "/collections/" } }) {
      frontmatter {
        title
        heading
        subheading
        collections {
          title
          description
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

Collections.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Collections;
