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
                excerpt
                images {
                  alt
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
  const { title, category, images, excerpt } = data.allMarkdownRemark.edges['0'].node.frontmatter;
  console.log(images);
  return (
    <div className="p-4 m-4 border">
      <h5>Latest piece - {title}</h5>
      <p>{category}</p>
      <div className="md:flex">
        <Img className="w-64" fluid={{ ...images['0'].image.childImageSharp.fluid }} alt={images['0'].alt} />
        <p className="md:w-1/2 md:pl-4">{excerpt}</p>
      </div>
    </div>
  );
};
export default FeaturedArt;
