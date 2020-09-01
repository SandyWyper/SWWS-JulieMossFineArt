import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
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
              fields {
                slug
              }
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
  // const { title, category, images, excerpt } = data.allMarkdownRemark.edges['0'].node.frontmatter;
  const { title, images, excerpt } = data.allMarkdownRemark.edges['0'].node.frontmatter;
  const { slug } = data.allMarkdownRemark.edges['0'].node.fields;
  return (
    <div className="container mx-auto md:flex md:items-end">
      <div className="md:w-2/4">
        <Img className="mb-4 md:mb-0" fluid={{ ...images['0'].image.childImageSharp.fluid }} alt={images['0'].alt} />
      </div>
      <div className="h-full md:w-2/4 md:pl-12">
        <h6 className="mb-0">Latest Piece</h6>
        <div className="">
          <Link to={slug}>
            <h5 className="mb-0">{title}</h5>
          </Link>
          {/* <p>{category}</p> */}
          <p className="mb-0">{excerpt}</p>
          {/* <p className="mx-auto mb-0 btn">view ...</p> */}
        </div>
      </div>
    </div>
  );
};
export default FeaturedArt;
