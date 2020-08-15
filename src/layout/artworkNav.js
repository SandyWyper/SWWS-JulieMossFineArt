import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import Link from 'gatsby-plugin-transition-link';

import groupBy from 'lodash.groupby';

const ArtworkNav = ({ show }) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/artwork/" } } }, sort: { order: ASC, fields: frontmatter___date }) {
        edges {
          node {
            id
            frontmatter {
              title
              category
              date(formatString: "DD/MM/YY hh:mm")
              images {
                image {
                  childImageSharp {
                    fixed(width: 100) {
                      ...GatsbyImageSharpFixed_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  // simplify data tree
  const artwork = data.allMarkdownRemark.edges;
  // organise artworks into their categories
  const groupedCollections = groupBy(artwork, function (item) {
    return item.node.frontmatter.category;
  });
  // Array of categories
  const collectionCategories = Object.keys(groupedCollections);

  // console.log(Array.isArray(collectionCategories), collectionCategories, groupedCollections);

  const navSpring = useSpring({
    opacity: show ? 1 : 0,
    marginBottom: show ? '0rem' : '-3rem',
  });

  return (
    <animated.div style={navSpring} className="art-nav">
      <div className="p-8">
        <h1>This is artwork nav</h1>
        <Link to="/collections">My Art</Link>
        <ul>
          {collectionCategories.map((category) => {
            groupedCollections[category].map((eachArt) => {
              const eachArtImages = eachArt.node.frontmatter.images;
              console.log(eachArtImages['0'], eachArt.node.frontmatter.title);
              return <li key={category}>{category}</li>;
            });
          })}
        </ul>
      </div>
    </animated.div>
  );
};

ArtworkNav.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ArtworkNav;
