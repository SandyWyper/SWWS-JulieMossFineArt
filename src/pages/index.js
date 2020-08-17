import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import SEO from '../components/seo';

const IndexPage = (props) => {
  // console.log(props);
  const { description, title } = props.data.allSite.edges[0].node.siteMetadata;
  return (
    <>
      <SEO title={title} description={description} />
      <section className="">
        <h1>Julie Moss</h1>
        <h2>Fine Art</h2>
      </section>
    </>
  );
};

export const data = graphql`
  query MyQuery {
    allSite {
      edges {
        node {
          siteMetadata {
            description
            title
          }
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};
export default IndexPage;
