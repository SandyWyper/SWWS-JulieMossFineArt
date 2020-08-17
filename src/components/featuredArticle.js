import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const FeaturedArticle = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(limit: 1, filter: { fields: { slug: { regex: "/blog/" } } }, sort: { order: DESC, fields: frontmatter___date }) {
          edges {
            node {
              frontmatter {
                description
                title
                mainImage {
                  imageAlt
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
      }
    `
  );
  const { title, description, mainImage } = data.allMarkdownRemark.edges['0'].node.frontmatter;

  return (
    <div className="p-4 m-4 border">
      <h5>Latest post - {title}</h5>
      <div className="md:flex">
        <Img className="w-64" fluid={{ ...mainImage.image.childImageSharp.fluid }} alt={mainImage.imageAlt} />
        <p className="md:w-1/2 md:pl-4">{description}</p>
      </div>
    </div>
  );
};
export default FeaturedArticle;
