import React from 'react';
import { graphql } from 'gatsby';
// import Img from 'gatsby-image';
import SEO from '../components/seo';
import PropTypes from 'prop-types';

const ArtworkTemplate = (props) => {
  const { markdownRemark } = props.data; // data.markdownRemark holds the post data
  const { frontmatter } = markdownRemark;
  return (
    <>
      <SEO title="Artwork" description={`${frontmatter.title}`} />
      <section className="">
        <div className="" />
        <div className="">
          <div className="">
            {/* <div>
              <Img className="" fluid={frontmatter.cover.childImageSharp.fluid} alt={frontmatter.coverAlt} loading="eager" />
              <div className=""> */}
            <h2 className="">{frontmatter.title}</h2>
            {/* 
                <div className="">
                  <p className="">{frontmatter.date}</p>
                </div>
              </div>
            </div> */}
          </div>

          {/* <article className="" dangerouslySetInnerHTML={{ __html: html }} /> */}
          {/* Maybe a link to the next article */}
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
      }
    }
  }
`;
ArtworkTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArtworkTemplate;
