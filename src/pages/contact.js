import React from 'react';
import NewsletterSignup from '../components/newsletterSignup';
import SEO from '../components/seo';
import ContactForm from '../components/contactForm';
import Footer from '../components/footer';
import Img from 'gatsby-image';

const Contact = (props) => {
  const pageData = props.data.markdownRemark.frontmatter;
  return (
    <>
      <SEO title="Contact" description="I would love to hear from you, so please do get in touch." url={props.location.href} />
      <div className="relative min-h-screen footer-padding">
        <section className="max-w-5xl px-4 pt-24 mx-auto mb-24">
          {pageData.title && <h1 className="text-center md:mb-12">{pageData.title}</h1>}
          <div className="mb-8 md:divide-x-2 md:flex">
            <div className="md:w-1/2 lg:pl-16 md:pr-6">
              <ContactForm prompt={pageData.prompt} />
            </div>
            <div className="md:w-1/2 md:pl-6 md:pr-16">
              <hr className="md:hidden" />
              <NewsletterSignup path={props.path} />
            </div>
          </div>
          <Img
            className="mx-16"
            fluid={{
              ...pageData.image.image.childImageSharp.fluid,
              sizes: 'calc(100vw - 2rem)',
            }}
            alt={pageData.image.imageAlt}
          />
        </section>
      </div>
      <Footer />
    </>
  );
};

export const data = graphql`
  {
    markdownRemark(fields: { slug: { eq: "/contact/" } }) {
      frontmatter {
        title
        prompt
        image {
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
    }
  }
`;

export default Contact;
