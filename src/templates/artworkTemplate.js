import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import PropTypes from 'prop-types';
import Footer from '../components/footer';

const ArtworkTemplate = (props) => {
  const { frontmatter, html } = props.data.markdownRemark;
  const { next, prev } = props.pageContext;

  const ArtWorkInfo = () => (
    <div className="max-w-xl mx-auto">
      <h3 className="mb-1">{frontmatter.title}</h3>
      {frontmatter.details && <p className="font-bold">{frontmatter.details}</p>}
      {html && <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );

  return (
    <>
      <SEO title={`Julie Moss - ${frontmatter.title}`} description="XXXXXX" />
      <section className="max-w-5xl px-4 pt-24 mx-auto text-left artwork-grid">
        <div className="pb-24 artwork-space md:pl-4">
          {frontmatter.images.map((art, i) => {
            if (i === 0) {
              return (
                <React.Fragment key={art.alt + i}>
                  <Img className="max-w-xl mx-auto mb-6 " fluid={{ ...art.image.childImageSharp.fluid, sizes: '400px' }} alt={art.alt} />
                  <ArtWorkInfo />
                </React.Fragment>
              );
            }
            return (
              <Img key={art.alt + i} className="max-w-xl mx-auto mb-6" fluid={{ ...art.image.childImageSharp.fluid, sizes: '400px' }} alt={art.alt} />
            );
          })}

          <div className="flex justify-between max-w-xl mx-auto">
            {prev && (
              <Link to={prev} rel="prev">
                ← Previous
              </Link>
            )}
            {next && (
              <Link to={next} rel="next">
                Next →
              </Link>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export const data = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        details
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
`;

ArtworkTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArtworkTemplate;
