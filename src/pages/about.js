import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';

const About = (props) => {
  const { frontmatter, html } = props.data.markdownRemark;
  console.log(props);
  return (
    <>
      <SEO title="pageData.frontmatter.title" />
      <section>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </>
  );
};

export const data = graphql`
  {
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;

About.propTypes = {
  data: PropTypes.object.isRequired,
};
export default About;
