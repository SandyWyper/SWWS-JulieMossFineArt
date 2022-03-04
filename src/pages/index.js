import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import SEO from '../components/seo';
// import FeaturedArt from '../components/featuredArt';
// import FeaturedArticle from '../components/featuredArticle';
// import NewsletterSignup from '../components/newsletterSignup';
import Footer from '../components/footer';
// import Fade from 'react-reveal/Fade';

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
      <div className="relative">
        <section className="flex flex-col items-center justify-center max-w-lg min-h-screen px-4 mx-auto lg:px-10 lg:justify-evenly lg:flex-row lg:max-w-6xl">
          <div className="mb-12 text-center lg:mb-0 lg:w-5/12 lg:pr-4">
            <h1 className="mb-4 leading-tight">Julie Moss</h1>
            <h2 className="sub-heading">Fine Art</h2>
            {/* <p className="">{intro.introText}</p> */}
            <Link to="/painting" className="btn">
              view work
            </Link>
          </div>

          <div className="w-full lg:w-7/12">
            <Img
              className="shadow-lg"
              loading="eager"
              fluid={{
                ...intro.introImage.image.childImageSharp.fluid,
                sizes: '(max-width: 640px) calc(100vw - 2rem), (max-width: 1023px) 550px,  (min-width: 1024px) 650px',
              }}
              alt={intro.introImage.imageAlt}
            />
          </div>
        </section>
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
