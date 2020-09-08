import React from 'react';
import { graphql, Link } from 'gatsby';
import find from 'lodash.find';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import pathify from '../lib/pathify';
import Footer from '../components/footer';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import CategorySelect from '../components/categorySelect';
import Fade from 'react-reveal/Fade';

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
          <div className="flex flex-col w-full pb-12 lg:pl-4 artwork-space">
            <div>
              <h1 className="mb-8 leading-none">{props.pageContext.collectionName}</h1>
            </div>
            {description !== undefined && <p>{description}</p>}
            <div>
              <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 450: 2 }}>
                <Masonry gutter={'10px'}>
                  {collectionArtwork.map((art, i) => {
                    const each = art.node.frontmatter.images['0'];
                    return (
                      <Fade>
                        <div key={`${each.alt}-${i}`}>
                          <Link to={art.node.fields.slug}>
                            <Img
                              fluid={{
                                ...each.image.childImageSharp.fluid,
                                sizes: '(max-width: 501px) calc(100vw - 2rem), (max-width: 1023px)  calc(50vw - 2rem),  (min-width: 1024px) 450px',
                              }}
                              alt={each.alt}
                              loading={i === 0 ? 'eager' : 'lazy'}
                            />
                          </Link>
                        </div>
                      </Fade>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
            </div>
            <div className="w-full max-w-2xl mx-auto font-normal">
              {!isFirst && (
                <Link to={`${pathify(collectionName)}/${prevPage}`} rel="prev" className="float-left font-normal">
                  ← Previous Page
                </Link>
              )}
              {!isLast && (
                <Link to={`${pathify(collectionName)}/${nextPage}`} rel="next" className="float-right font-normal">
                  Next Page →
                </Link>
              )}
            </div>
          </div>
          <div className="mb-8 lg:hidden lg:mb-0">
            <CategorySelect path={props.path} />
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
                  fluid(srcSetBreakpoints: [400, 500, 600, 700, 800, 1000, 1200, 1500]) {
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
