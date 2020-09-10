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
                excerpt
                details
                images {
                  alt
                  image {
                    childImageSharp {
                      fluid(srcSetBreakpoints: [400, 500, 600, 700, 800, 1000, 1200, 1500, 2000]) {
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
  const { title, images, excerpt, details } = data.allMarkdownRemark.edges['0'].node.frontmatter;
  const { slug } = data.allMarkdownRemark.edges['0'].node.fields;
  return (
    <div className="md:flex md:items-end">
      <div className="md:w-1/2">
        <Img
          className="mb-4 md:mb-0"
          fluid={{
            ...images['0'].image.childImageSharp.fluid,
            sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px)  calc(50vw - 2rem),  (min-width: 1024px) 550px',
          }}
          alt={images['0'].alt}
        />
      </div>
      <div className="h-full md:w-1/2 md:pl-12">
        <h6 className="mb-0">Latest Piece</h6>
        <div>
          <Link to={slug}>
            <h5 className="mb-0">{title}</h5>
          </Link>
          <p className="mb-0">{details}</p>
          {excerpt && <p className="mt-2 mb-0">{excerpt}</p>}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArt;
