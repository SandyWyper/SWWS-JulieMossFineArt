import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import PropTypes from 'prop-types';
import Footer from '../components/footer';
import Fade from 'react-reveal/Fade';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
import pathify from '../lib/pathify';

import Mag from '../icons/magnifyingGlass';

const ArtworkTemplate = (props) => {
  const { frontmatter, html } = props.data.markdownRemark;
  const { next, prev } = props.pageContext;
  const collectionName = pathify(props.pageContext.collectionName);
  const sharingImageAlt = frontmatter.images !== null ? frontmatter.images[0].alt : null;
  const sharingImage = frontmatter.images !== null ? frontmatter.images[0].image.childImageSharp.resize.src : null;

  const allCollections = Object.keys(props.pageContext.allCollections);

  const lightboxOptions = {
    settings: {
      autoplaySpeed: 1500,
      transitionSpeed: 900,
    },
    buttons: {
      showDownloadButton: false,
      showThumbnailsButton: false,
      showAutoplayButton: false,
    },
    caption: {
      showCaption: false,
    },
    thumbnails: {
      showThumbnails: false,
    },
  };

  const ArtWorkInfo = () => (
    <div className="artwork-deets">
      <h3 className="mb-0 text-2xl leading-tight md:text-3xl">{frontmatter.title}</h3>
      {frontmatter.details && <p className="mt-2 mb-0 font-bold">{frontmatter.details}</p>}
      {html && <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />}
      {frontmatter.isForSale ? (
        <div className="">
          <h6 className="mt-4 mb-0">
            Available for purchase&nbsp;:&nbsp;
            <Link to="/contact">
              <span className="mb-0 underline">Enquire</span>
            </Link>
          </h6>
        </div>
      ) : (
        <span />
      )}
    </div>
  );

  return (
    <>
      <SEO title={`Julie Moss - ${frontmatter.title}`} url={props.location.href} image={sharingImage} imageAlt={sharingImageAlt} />
      <div className="relative">
        <SimpleReactLightbox>
          <SRLWrapper options={lightboxOptions}>
            <section className={`max-w-6xl px-4 lg:px-10 pt-24 mx-auto text-left pb-12`}>
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
              <div className="flex flex-col justify-center layout-height">
                <div className="lg:flex lg:items-end">
                  <div className="pb-12 lg:w-1/2 lg:pb-0">
                    <Mag className="w-4 mb-2" />
                    {frontmatter.images !== null &&
                      frontmatter.images.map((art, i) => {
                        if (art.image !== null) {
                          return (
                            <Fade key={art.alt + i} duration={1500}>
                              <a href={frontmatter.images[i].image.publicURL} data-attribute="SLR">
                                <Img
                                  className={i > 0 ? 'mt-10' : ''}
                                  fluid={{
                                    ...art.image.childImageSharp.fluid,
                                    sizes: '(max-width: 640px) calc(100vw - 2rem), 750px',
                                  }}
                                  alt={art.alt}
                                  loading={i === 0 ? 'eager' : 'lazy'}
                                />
                              </a>
                            </Fade>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </div>
                  <div>
                    <ArtWorkInfo />
                  </div>
                </div>
                <div className="w-full max-w-6xl mx-auto mt-8 ">
                  {prev && (
                    <Link to={prev} rel="prev" className="mr-8 text-xs font-bold">
                      ← Previous
                    </Link>
                  )}
                  {next && (
                    <Link to={next} rel="next" className="text-xs font-bold">
                      Next →
                    </Link>
                  )}
                </div>
              </div>
            </section>
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>
      <Footer />
    </>
  );
};

export const data = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        details
        isForSale
        images {
          alt
          image {
            publicURL
            childImageSharp {
              fluid(srcSetBreakpoints: [400, 500, 600, 700, 800, 1000, 1200, 1500, 2000]) {
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
`;

ArtworkTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArtworkTemplate;
