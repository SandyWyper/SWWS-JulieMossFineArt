import React from 'react';
import { graphql } from 'gatsby';
// import Img from 'gatsby-image';
import SEO from '../components/seo';
import PropTypes from 'prop-types';

const BlogTemplate = (props) => {
  const { markdownRemark } = props.data; // data.markdownRemark holds the post data
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <SEO title="Blog" description={`${frontmatter.title} / ${frontmatter.description}`} />
      <section className="">
        <div className="" />
        <div className="">
          <div className="">
            {/* <div>
              <Img className="" fluid={frontmatter.cover.childImageSharp.fluid} alt={frontmatter.coverAlt} loading="eager" />
              <div className="">
                <h2 className="">{frontmatter.title}</h2>

                <div className="">
                  <p className="">{frontmatter.date}</p>
                </div>
              </div>
            </div> */}
          </div>

          <article className="" dangerouslySetInnerHTML={{ __html: html }} />
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
      html
    }
  }
`;
BlogTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogTemplate;
