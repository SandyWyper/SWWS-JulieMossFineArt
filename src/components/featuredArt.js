import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const FeaturedArt = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/artwork/" } }, frontmatter: { isFeatured: { eq: true } } }
          sort: { order: DESC, fields: frontmatter___date }
          limit: 1
        ) {
          edges {
            node {
              frontmatter {
                title
                category
                images {
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
  const featuredArtData = data.allMarkdownRemark.edges['0'].node;
  const { title, category, images } = featuredArtData.frontmatter;
  console.log(featuredArtData);
  return (
    <div className="p-4 m-4 border">
      <h5>Latest piece - {title}</h5>
      <p>{category}</p>
      <Img className="w-64" fluid={{ ...images['0'].image.childImageSharp.fluid }} alt={images['0'].alt} />
    </div>
  );
};
export default FeaturedArt;
