import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import PropTypes from 'prop-types';

const ArtworkTemplate = (props) => {
  const { frontmatter, html } = props.data.markdownRemark;

  return (
    <>
      <SEO title={`Julie Moss - ${frontmatter.title}`} description="XXXXXX" />
      <section className="max-w-lg mx-auto">
        <div className="">
          <h2 className="">{frontmatter.title}</h2>
          <p>{frontmatter.details}</p>
          <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
          {frontmatter.images.map((art, i) => {
            return <Img key={art.alt + i} className="" fluid={{ ...art.image.childImageSharp.fluid, sizes: '400px' }} alt={art.alt} />;
          })}

          {/* Maybe a link to the next piece */}
        </div>
      </section>
    </>
  );
};

export const data = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        details
        images {
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
`;

ArtworkTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArtworkTemplate;
