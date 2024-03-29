import React from 'react';
import { graphql, Link } from 'gatsby';
import find from 'lodash.find';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import pathify from '../lib/pathify';
import Footer from '../components/footer';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
// import CategorySelect from '../components/categorySelect';
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
  const sharingImage = collectionArtwork['0'].node.frontmatter.images !== null ? collectionArtwork['0'].node.frontmatter.images['0'].image.childImageSharp.resize.src : null;

  const allCollections = Object.keys(props.pageContext.allCollections);

  return (
    <>
      <SEO title={`Julie Moss - ${props.pageContext.collectionName}`} description={description} url={props.location.href} image={sharingImage} />
      <div className="relative min-h-screen">
        <section className="max-w-6xl px-4 pt-24 mx-auto text-left lg:px-10">
          <div className="flex flex-col w-full pb-12">
            <div className={`md:flex md:items-end mb-4`}>
              {allCollections.map((collection, i) => {
                return collectionName.includes(pathify(collection)) ? (
                  <Link to={pathify(collection)} key={`collection-link-${i}`}>
                    <h1 className={`mb-2 text-2xl leading-tight`}>
                      {collection}
                      {i !== allCollections.length - 1 ? <span>&nbsp;/</span> : ''}
                      <span>&nbsp;</span>
                    </h1>
                  </Link>
                ) : (
                  <Link to={pathify(collection)} key={`collection-link-${i}`}>
                    <h2 className={`mb-2  text-2xl leading-tight  ${props.path.includes(pathify(collection)) ? '' : 'opacity-50'}`}>
                      {collection}
                      {i !== allCollections.length - 1 ? <span>&nbsp;/</span> : ''}
                      <span>&nbsp;</span>
                    </h2>
                  </Link>
                );
              })}
            </div>
            {description !== undefined && <p className="text-lg">{description}</p>}
            <div>
              <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 600: 2 }}>
                <Masonry gutter={'3rem'}>
                  {collectionArtwork.map((art, i) => {
                    const each = art.node.frontmatter.hasOwnProperty('images') & (art.node.frontmatter.images !== null) ? art.node.frontmatter.images['0'] : null;
                    if (each !== null) {
                      return (
                        <Fade key={`${each.alt}-${i}`}>
                          <Link to={art.node.fields.slug}>
                            <Img
                              fluid={{
                                ...each.image.childImageSharp.fluid,
                                sizes: '(max-width: 501px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2rem),  (min-width: 1024px) 450px',
                              }}
                              alt={each.alt}
                              loading={i === 0 ? 'eager' : 'lazy'}
                            />
                          </Link>
                        </Fade>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Masonry>
              </ResponsiveMasonry>
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
          {/* <div className="mb-8 lg:hidden lg:mb-0">
            <CategorySelect path={props.path} />
          </div> */}
        </section>
      </div>
      <Footer />
    </>
  );
};

export const artQuery = graphql`
  query collectionArt($collectionName: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: $collectionName } } }, sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
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
                  fluid(srcSetBreakpoints: [400, 500, 600, 700, 800, 1000, 1200, 1500]) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                  resize(width: 800) {
                    src
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
