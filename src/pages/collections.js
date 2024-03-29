import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import EachCollection from '../components/eachCollection';
import Footer from '../components/footer';

const Collections = (props) => {
  const { heading, subheading, title, collections } = props.data.markdownRemark.frontmatter;

  return (
    <>
      <SEO title={title} description={subheading} url={props.location.href} />
      <div className="relative min-h-screen">
        <section className="max-w-5xl px-4 pt-24 mx-auto ">
          <div className="mb-20 text-center">
            {heading && <h1 className="mb-4 leading-tight">{heading}</h1>}
            {subheading && <h4 className="sub-heading">{subheading}</h4>}
          </div>
          <div className="">
            {collections.map((collection, i) => {
              const isLast = i === collections.length - 1;

              return (
                <React.Fragment key={`${collection.title}-container`}>
                  <EachCollection collection={collection} /> {isLast ? <div className="w-full mb-16" /> : <hr />}
                </React.Fragment>
              );
            })}
          </div>
        </section>
      </div>
      <Footer />
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
                fluid(srcSetBreakpoints: [400, 500, 600, 700, 800, 1000, 1200, 1500]) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(srcSetBreakpoints: [400, 500, 600, 700, 800]) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(srcSetBreakpoints: [400, 500, 600, 700, 800]) {
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
