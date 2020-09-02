/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, meta, title, image, imageAlt, url }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            defaultImage: image
            defaultUrl: url
          }
        }
      }
    `
  );
  const { defaultDescription, defaultTitle, defaultImage, defaultUrl } = site.siteMetadata;

  const metaDescription = description || defaultDescription;
  const metaTitle = title || defaultTitle;
  const metaImage = `${defaultUrl}${image}` || `${defaultUrl}${defaultImage}`;
  const metaImageAlt = imageAlt || 'Julie Moss';
  const metaUrl = url || defaultUrl;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || defaultTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          propery: 'og:url',
          content: metaUrl,
        },
        {
          property: 'og:site_name',
          content: 'Julie Moss - Fine Art',
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: 'Julie Moss',
        },
        {
          name: 'twitter:image:alt',
          content: metaImageAlt,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default SEO;
