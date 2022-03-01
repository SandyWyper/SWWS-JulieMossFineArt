import React, { useState, useLayoutEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import groupBy from 'lodash.groupby';
import pathify from '../lib/pathify';
import Masonry from 'react-responsive-masonry';

const ArtworkNavInner = ({ path }) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/artwork/" } } }, sort: { order: DESC, fields: frontmatter___date }) {
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
                    fixed(width: 100) {
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

  const [activeTab, setActiveTab] = useState(null);

  const activateTab = (evt) => {
    // evt.preventDefault();
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
    return item.node.frontmatter.category.trim();
  });

  // Array of categories
  const collectionCategories = Object.keys(groupedCollections);
  useLayoutEffect(() => {
    const pathifiedArray = collectionCategories.map((category) => {
      return pathify(category);
    });
    if (pathifiedArray.indexOf(path) > -1) {
      setActiveTab(pathifiedArray.indexOf(path));
    }
    return;
  }, [path, collectionCategories]);

  return collectionCategories.map((category, i) => {
    const collectionImages = groupedCollections[category].map((eachArt) => {
      const eachArtImage = eachArt.node.frontmatter.images !== null ? eachArt.node.frontmatter.images['0'] : null;
      const isCurrent = path === eachArt.node.fields.slug;
      // return for groupCollections map
      if (eachArtImage !== null) {
        return (
          <Link key={eachArtImage.image.id} className={`artThumb ${isCurrent && 'isActive'}`} to={eachArt.node.fields.slug.slice(0, -1)}>
            <Img fixed={{ ...eachArtImage.image.childImageSharp.fixed }} alt={eachArtImage.alt} />
          </Link>
        );
      } else {
        return null;
      }
    });

    // return for collectionCategories map
    return (
      <React.Fragment key={`${pathify(category)}-container-${i}`}>
        <Link className={`art-category-nav font-bold ${activeTab === i ? 'isActive' : ''}`} to={pathify(category)} index={i} onClick={activateTab}>
          {category}
        </Link>
        <div>
          <div className={`category-image-grid ${activeTab === i ? 'isActive' : ''}`} aria-hidden={activeTab !== i}>
            <Masonry gutter={'1'} columnsCount={2}>
              {collectionImages.map((image) => image)}
            </Masonry>
          </div>
        </div>
      </React.Fragment>
    );
  });
};

export default ArtworkNavInner;
