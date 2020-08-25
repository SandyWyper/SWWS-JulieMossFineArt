import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import groupBy from 'lodash.groupby';

const ArtworkNavInner = ({ path }) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/artwork/" } } }, sort: { order: ASC, fields: frontmatter___date }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              category
              date(formatString: "DD/MM/YY hh:mm")
              images {
                alt
                image {
                  id
                  childImageSharp {
                    fixed(width: 75) {
                      ...GatsbyImageSharpFixed_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const [activeTab, setActiveTab] = useState(0);

  const activateTab = (evt) => {
    evt.preventDefault();
    const index = parseInt(evt.target.getAttribute('index'));
    if (index === activeTab) return;
    let categoryHeaders = document.querySelectorAll('.art-category-nav');
    categoryHeaders.forEach((header) => {
      if (header.classList.contains('isActive')) {
        header.classList.remove('isActive');
      } else {
        evt.target.classList.add('isActive');
      }
      setActiveTab(index);
    });
  };

  // simplify data tree
  const artwork = data.allMarkdownRemark.edges;
  // organise artworks into their categories
  const groupedCollections = groupBy(artwork, function (item) {
    return item.node.frontmatter.category;
  });

  // Array of categories
  const collectionCategories = Object.keys(groupedCollections);

  return collectionCategories.map((category, i) => {
    const collectionImages = groupedCollections[category].map((eachArt) => {
      const eachArtImage = eachArt.node.frontmatter.images['0'];
      const isCurrent = path === eachArt.node.fields.slug;
      // return for groupCollections map
      return (
        <li key={eachArtImage.image.id} className={`p-1 artThumb ${isCurrent && 'isActive'}`}>
          <Link to={eachArt.node.fields.slug.slice(0, -1)}>
            <Img fixed={{ ...eachArtImage.image.childImageSharp.fixed }} alt={eachArtImage.alt} />
          </Link>
        </li>
      );
    });

    // return for collectionCategories map
    return (
      <React.Fragment key={`${category.replace(' ', '-')}-container-${i}`}>
        <Link
          className={`art-category-nav ${activeTab === i ? 'isActive' : ''}`}
          to={`/${category.replace(' ', '-').toLowerCase()}`}
          index={i}
          onClick={activateTab}
        >
          {category}
        </Link>
        <nav className="">
          <ul className={`flex flex-wrap items-center category-image-grid ${activeTab === i ? 'isActive' : ''}`} aria-hidden={activeTab !== i}>
            {collectionImages.map((image) => image)}
          </ul>
        </nav>
      </React.Fragment>
    );
  });
};

export default ArtworkNavInner;
