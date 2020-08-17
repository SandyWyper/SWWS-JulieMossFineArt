import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import EachCollection from '../components/eachCollection';

const Collections = (props) => {
  const { heading, subheading, title, collections } = props.data.markdownRemark.frontmatter;
  // console.log(props);
  return (
    <>
      <SEO title={title} description="XXXXXXX" />
      <section className="max-w-lg mx-auto">
        <h1>{heading}</h1>
        <h4>{subheading}</h4>
        <div>
          {collections.map((collection) => {
            return <EachCollection collection={collection} key={`${collection.title}-container`} />;
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
