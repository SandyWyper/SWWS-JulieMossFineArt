import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import FeaturedArt from '../components/featuredArt';
import FeaturedArticle from '../components/featuredArticle';
import NewsletterSignup from '../components/newsletterSignup';
import Footer from '../components/footer';
import Fade from 'react-reveal/Fade';

const IndexPage = ({
  data: {
    markdownRemark: {
      frontmatter: { intro, myArt, myBlog },
    },
  },
}) => {
  return (
    <>
      <SEO />
      <div className="relative min-h-screen footer-padding">
        <section className="max-w-5xl px-4 pt-24 mx-auto text-center ">
          <div className="max-w-lg mx-auto mb-12 lg:max-w-full lg:flex lg:items-center lg:mb-24">
            <div className="mb-8 lg:w-2/5 lg:pr-4">
              <h1 className="mb-4 leading-tight">Julie Moss</h1>
              <h2 className="sub-heading">Fine Art</h2>
              <p className="">{intro.introText}</p>
              <Link to="/about" className="btn">
                about Julie ...
              </Link>
            </div>

            <div className="lg:w-3/5 lg:pl-4">
              <Img
                className="mb-4 shadow-lg"
                loading="eager"
                fluid={{
                  ...intro.introImage.image.childImageSharp.fluid,
                  sizes: '(max-width: 640px) calc(100vw - 2rem), (max-width: 1023px) 550px,  (min-width: 1024px) 650px',
                }}
                alt={intro.introImage.imageAlt}
              />
            </div>
          </div>
        </section>
        {/* my art */}
        <Fade duration={1500}>
          <section className="max-w-5xl px-4 mx-auto mb-12 lg:mb-24">
            <div className="max-w-lg mx-auto lg:max-w-full lg:flex lg:flex-row-reverse lg:items-center">
              <div className="my-8 text-center lg:w-2/5 lg:px-6">
                <Link to="/collections">
                  <h3>{myArt.title}</h3>
                </Link>
                <p className="">{myArt.description}</p>
                <Link to="/collections" className="btn">
                  view collections ...
                </Link>
              </div>
              <div className="lg:w-3/5">
                <Img
                  className="shadow-lg"
                  fluid={{
                    ...myArt.myArtImage.image.childImageSharp.fluid,
                    sizes: '(max-width: 640px) calc(100vw - 2rem), (max-width: 1023px) 550px,  (min-width: 1024px) 650px',
                  }}
                  alt={myArt.myArtImage.imageAlt}
                />
              </div>
            </div>
          </section>
        </Fade>
        <section className="mb-12 bg-gray-300 lg:mb-24">
          <Fade duration={1500}>
            <div className="max-w-5xl px-4 mx-auto">
              <div className="max-w-lg mx-auto lg:max-w-full lg:flex lg:items-center">
                <div className="pt-10 mb-12 text-center lg:pt-0 lg:w-1/2">
                  <Link to="/blog">
                    <h3>{myBlog.title}</h3>
                  </Link>
                  <p className="max-w-md mx-auto">{myBlog.description}</p>
                  <Link to="/blog" className="btn">
                    view blog ...
                  </Link>
                </div>
                <div className="pb-24 md:p-12 lg:w-1/2">
                  <FeaturedArticle />
                </div>
              </div>
            </div>
          </Fade>
        </section>
        {/* <Fade duration={1500}>
          <section className="max-w-5xl px-4 mx-auto mb-12 lg:mb-24">
            <FeaturedArt />
          </section>
        </Fade> */}
        {/* <hr /> */}
        <Fade duration={1500}>
          <section className="max-w-md px-4 mx-auto mb-16 text-center">
            <NewsletterSignup />
          </section>
        </Fade>
        <Footer />
      </div>
    </>
  );
};

export const data = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/home/" } }) {
      frontmatter {
        myArt {
          title
          description
          myArtImage {
            imageAlt
            image {
              childImageSharp {
                fluid(srcSetBreakpoints: [400, 500, 600, 700, 800, 1000, 1200, 1500, 2000]) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        intro {
          introText
          introImage {
            imageAlt
            image {
              childImageSharp {
                fluid(srcSetBreakpoints: [400, 500, 600, 700, 800, 1000, 1200, 1500, 2000]) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        isFeaturedArtShown
        isFeaturedArticleShown
        myBlog {
          description
          title
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;
