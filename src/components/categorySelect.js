import React, { useState, useLayoutEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import groupBy from 'lodash.groupby';
import pathify from '../lib/pathify';
import PropTypes from 'prop-types';

const CategorySelect = ({ path }) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/artwork/" } } }, sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
              date(formatString: "DD/MM/YY hh:mm")
            }
          }
        }
      }
    }
  `);

  const [activeOption, setActiveOption] = useState('');

  // simplify data tree
  const artwork = data.allMarkdownRemark.edges;
  // organise artworks into their categories
  const groupedCollections = groupBy(artwork, function (item) {
    return item.node.frontmatter.category;
  });

  // Array of categories
  const collectionCategories = Object.keys(groupedCollections);

  const handleSelectChange = (event) => {
    setActiveOption(event.target.value);
    navigate(pathify(event.target.value));
  };

  useLayoutEffect(() => {
    const pathifiedArray = collectionCategories.map((category) => {
      return pathify(category);
    });
    if (pathifiedArray.indexOf(path) > -1) {
      setActiveOption(collectionCategories[pathifiedArray.indexOf(path)]);
    }

    return;
  }, [path, collectionCategories]);

  return (
    <div className="w-full ">
      <div className="relative inline-block w-full">
        <select
          name="category-select"
          value={activeOption}
          onChange={handleSelectChange}
          onBlur={() => console.log('option selected')}
          className="block w-full px-4 py-2 pr-8 text-lg leading-tight bg-white border border-gray-400 appearance-none hover:border-gray-500 focus:outline-none focus:shadow-none"
        >
          {collectionCategories.map((category) => (
            <option key={`category-${category}`}>{category}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg className="w-4 h-4 fill-current text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

CategorySelect.propTypes = {
  path: PropTypes.string.isRequired,
};

export default CategorySelect;
