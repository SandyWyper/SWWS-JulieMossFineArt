import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import FeaturedArt from '../components/featuredArt';
import FeaturedArticle from '../components/featuredArticle';
import NewsletterSignup from '../components/newsletterSignup';
import Footer from '../components/footer';

const IndexPage = ({
  data: {
    markdownRemark: {
      frontmatter: { intro, myArt, myBlog },
    },
  },
}) => {
  return (
    <>
      <SEO title="homeXXXX" description="page description XXX" />
      <section className="max-w-5xl px-4 pt-24 mx-auto text-center">
        <div className="max-w-lg mx-auto mb-12 lg:max-w-full lg:flex lg:items-center lg:mb-24">
          <div className="mb-8 lg:w-2/5 lg:pr-4">
            <h1 className="mb-4 leading-tight">Julie Moss</h1>
            <h2 className="sub-heading">Fine Art</h2>
            <p className="">{intro.introText}</p>
            <Link to="/about" className=" btn">
              about Julie ...
            </Link>
          </div>

          <div className="lg:w-3/5 lg:pl-4">
            <Img className="mb-4" fluid={{ ...intro.introImage.image.childImageSharp.fluid }} alt={intro.introImage.imageAlt} />
          </div>
        </div>
      </section>
      {/* my art */}
      <section className="max-w-5xl px-4 mx-auto mb-12 lg:mb-24">
        <div className="max-w-lg mx-auto lg:max-w-full lg:flex lg:flex-row-reverse lg:items-center">
          <div className="m-8 text-center lg:w-2/5">
            <Link to="/collections">
              <h3>{myArt.title}</h3>
              <p className="">{myArt.description}</p>
              <p className="mx-auto btn">view collections ...</p>
            </Link>
          </div>
          <div className="lg:w-3/5">
            <Link to="/collections">
              <Img className="shadow-xl" fluid={{ ...myArt.myArtImage.image.childImageSharp.fluid }} alt={myArt.myArtImage.imageAlt} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-gray-300 lg:mb-24">
        <div className="max-w-5xl px-4 mx-auto">
          <div className="max-w-lg mx-auto lg:max-w-full lg:flex lg:items-center">
            <div className="pt-10 text-center lg:pt-0 lg:w-1/2">
              <Link to="/blog">
                <h3>{myBlog.title}</h3>
              </Link>
              <p className="max-w-md mx-auto">{myBlog.description}</p>
              <Link to="/blog">
                <p className="mx-auto btn">view blog ...</p>
              </Link>
            </div>
            <div className="pb-24 md:p-12 lg:w-1/2">
              <FeaturedArticle />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl px-4 mx-auto mb-12 lg:mb-24">
        <FeaturedArt />
      </section>
      <hr />
      <section className="max-w-md px-4 mx-auto mb-16 text-center">
        <NewsletterSignup />
      </section>
      <Footer />
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
                fluid {
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
                fluid {
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
          myBlogImage {
            imageAlt
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;
