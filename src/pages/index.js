import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = (props) => {
  console.log(props);
  const { description, title } = props.data.allSite.edges[0].node.siteMetadata;
  return (
    <Layout>
      <SEO title={title} description={description} />
      <section className="container relative mx-auto bg-yellow-300 shadow">
        <h1>Julie Moss</h1>
        <h2>Fine Art</h2>
        <input placeholder="testing" type="text" name="test-field" />
      </section>
    </Layout>
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
