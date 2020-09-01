import React from 'react';
import { graphql, Link } from 'gatsby';
import find from 'lodash.find';
import Img from 'gatsby-image';
import Footer from '../components/footer';
import SEO from '../components/seo';

const CollectionTemplate = (props) => {
  const collectionArtwork = props.data.allMarkdownRemark.edges;
  const allCollectionInfo = props.data.markdownRemark.frontmatter.collections;
  const { collectionName } = props.pageContext;
  const { description } = find(allCollectionInfo, ['title', collectionName]) || {};

  return (
    <>
      <SEO title={`Julie Moss -`} description="XXXXXX" />
      <section className="max-w-5xl px-4 pt-24 mx-auto text-left artwork-grid">
        <div className="flex flex-col w-full pb-24 md:pl-4 artwork-space">
          <div>
            <h1>{props.pageContext.collectionName}</h1>
          </div>
          {description !== undefined && <p>{description}</p>}
          <div className="grid items-start grid-cols-2 gap-4 md:gap-10">
            {collectionArtwork.map((art, i) => {
              const firstImage = art.node.frontmatter.images['0'];
              return (
                <div className="w-full" key={`${firstImage.alt}-${i}`}>
                  <Link to={art.node.fields.slug}>
                    <Img className="" fluid={{ ...firstImage.image.childImageSharp.fluid }} alt={firstImage.alt} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
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
