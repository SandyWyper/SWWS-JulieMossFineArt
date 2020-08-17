import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import SEO from '../components/seo';

import FeaturedArt from '../components/featuredArt';
import FeaturedArticle from '../components/featuredArticle';

const IndexPage = ({
  data: {
    markdownRemark: {
      frontmatter: { intro, myArt, myBlog, isFeaturedArtShown, isFeaturedArticleShown },
    },
  },
}) => {
  return (
    <>
      <SEO title="homeXXXX" description="page description XXX" />
      <section className="">
        <h1>Julie Moss</h1>
        <h2>Fine Art</h2>

        <div>
          <Img className="w-64" fluid={{ ...intro.introImage.image.childImageSharp.fluid }} alt={intro.introImage.imageAlt} />
          <p>{intro.introText}</p>
        </div>

        <div>
          <h3>{myArt.title}</h3>
          <p>{myArt.description}</p>
          <Img className="w-64" fluid={{ ...myArt.myArtImage.image.childImageSharp.fluid }} alt={myArt.myArtImage.imageAlt} />
        </div>

        <div>
          <h3>{myBlog.title}</h3>
          <p>{myBlog.description}</p>
          <Img className="w-64" fluid={{ ...myBlog.myBlogImage.image.childImageSharp.fluid }} alt={myBlog.myBlogImage.imageAlt} />
        </div>

        {isFeaturedArtShown && <FeaturedArt />}
        {isFeaturedArticleShown && <FeaturedArticle />}
      </section>
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
