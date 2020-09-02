import React from 'react';
import { graphql, Link } from 'gatsby';
import find from 'lodash.find';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import pathify from '../lib/pathify';
import Footer from '../components/footer';

const CollectionTemplate = (props) => {
  const collectionArtwork = props.data.allMarkdownRemark.edges;
  const allCollectionInfo = props.data.markdownRemark.frontmatter.collections;
  const { collectionName } = props.pageContext;
  const { description } = find(allCollectionInfo, ['title', collectionName]) || {};

  const { currentPage, totalPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <>
      <SEO
        title={`Julie Moss - ${props.pageContext.collectionName}`}
        description={description}
        url={props.location.href}
        image={collectionArtwork[0].node.frontmatter.images[0].image.publicURL}
      />
      <div className="relative min-h-screen footer-padding">
        <section className="max-w-5xl px-4 pt-24 mx-auto text-left artwork-grid">
          <div className="flex flex-col w-full pb-24 md:pl-4 artwork-space">
            <div>
              <h1>{props.pageContext.collectionName}</h1>
            </div>
            {description !== undefined && <p>{description}</p>}
            <div className="grid items-start grid-cols-2 gap-4 mb-6 md:gap-10">
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
            <div className="w-full max-w-2xl mx-auto font-bold">
              {!isFirst && (
                <Link to={`${pathify(collectionName)}/${prevPage}`} rel="prev" className="float-left font-bold">
                  ← Previous Page
                </Link>
              )}
              {!isLast && (
                <Link to={`${pathify(collectionName)}/${nextPage}`} rel="next" className="float-right font-bold">
                  Next Page →
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export const artQuery = graphql`
  query collectionArt($collectionName: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $collectionName } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
                publicURL
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
