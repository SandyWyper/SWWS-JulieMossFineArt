import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

const FeaturedArticle = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(limit: 1, filter: { fields: { slug: { regex: "/blog/" } } }, sort: { order: DESC, fields: frontmatter___date }) {
          edges {
            node {
              fields {
                slug
              }
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
  const { slug } = data.allMarkdownRemark.edges['0'].node.fields;

  return (
    <div className="relative">
      <h6 className="absolute top-0 right-0 z-50 pt-1 pr-2 text-white">latest article</h6>
      <Link to={slug}>
        <Img className="mb-8 min-h-400" fluid={{ ...mainImage.image.childImageSharp.fluid }} alt={mainImage.imageAlt} />
        <div className="absolute bottom-0 p-6 mx-2 -mb-16 text-center bg-white sm:mx-8">
          <h5>{title}</h5>
          <p className="mb-1 text-sm">{description}</p>
          <p className="mx-auto mb-0 font-bold">read more ...</p>
        </div>
      </Link>
    </div>
  );
};
export default FeaturedArticle;
