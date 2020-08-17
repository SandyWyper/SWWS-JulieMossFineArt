import React from 'react';
import { graphql } from 'gatsby';
import find from 'lodash.find';
import Img from 'gatsby-image';
import Link from 'gatsby-plugin-transition-link';

const CollectionTemplate = (props) => {
  const collectionArtwork = props.data.allMarkdownRemark.edges;
  const allCollectionInfo = props.data.markdownRemark.frontmatter.collections;
  const { collectionName } = props.pageContext;
  const { description } = find(allCollectionInfo, ['title', collectionName]) || {};

  return (
    <section>
      <div>
        <h1>{props.pageContext.collectionName}</h1>
        {description !== undefined && <p>{description}</p>}
      </div>
      <div className="flex flex-col items-end w-full">
        {collectionArtwork.map((art, i) => {
          console.log(art);
          const firstImage = art.node.frontmatter.images['0'];
          return (
            <Link to={art.node.fields.slug} key={`${firstImage.alt}-${i}`}>
              <Img className="w-64" fluid={{ ...firstImage.image.childImageSharp.fluid }} alt={firstImage.alt} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export const artQuery = graphql`
  query collectionArt($collectionName: String!) {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: $collectionName } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD/MM/YY")
            isFeatured
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
    }
    markdownRemark(fields: { slug: { eq: "/collections/" } }) {
      frontmatter {
        collections {
          title
          description
        }
      }
    }
  }
`;

export default CollectionTemplate;
