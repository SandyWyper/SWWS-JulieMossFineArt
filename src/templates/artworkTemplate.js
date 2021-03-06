import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import PropTypes from 'prop-types';
import Footer from '../components/footer';
import Fade from 'react-reveal/Fade';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';

const ArtworkTemplate = (props) => {
  const { frontmatter, html } = props.data.markdownRemark;
  const { next, prev } = props.pageContext;
  const sharingImageAlt = frontmatter.images !== null ? frontmatter.images[0].alt : null;
  const sharingImage = frontmatter.images !== null ? frontmatter.images[0].image.childImageSharp.resize.src : null;

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
    <div className="max-w-xl mx-auto">
      <h3 className="mb-0 text-2xl leading-tight md:text-3xl">{frontmatter.title}</h3>
      {frontmatter.details && <p className="font-bold">{frontmatter.details}</p>}
      {html && <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
  return (
    <>
      <SEO title={`Julie Moss - ${frontmatter.title}`} url={props.location.href} image={sharingImage} imageAlt={sharingImageAlt} />
      <div className="relative min-h-screen footer-padding">
        <SimpleReactLightbox>
          <SRLWrapper options={lightboxOptions}>
            <section className="max-w-5xl px-4 pt-24 mx-auto text-left artwork-grid">
              <div className="pb-12 artwork-space md:pl-4">
                {frontmatter.images !== null &&
                  frontmatter.images.map((art, i) => {
                    if (art.image !== null) {
                      return (
                        <Fade key={art.alt + i} duration={1500}>
                          <a href={frontmatter.images[i].image.publicURL} data-attribute="SLR">
                            <Img
                              className="max-w-xl mx-auto mb-4"
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
                <ArtWorkInfo />
                <div className="w-full max-w-xl mx-auto mt-4">
                  {prev && (
                    <Link to={prev} rel="prev" className="float-left font-bold">
                      ← Previous
                    </Link>
                  )}
                  {next && (
                    <Link to={next} rel="next" className="float-right font-bold">
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
