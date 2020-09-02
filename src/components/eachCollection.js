import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import pathify from '../lib/pathify';

const EachCollection = ({ collection }) => {
  return (
    <>
      <div className="lg:flex-row-reverse lg:flex lg:items-end">
        <div className="max-w-xl mx-auto mb-4 lg:mb-0 lg:w-1/2 lg:pl-8">
          <Link to={pathify(collection.title)}>
            <h3 className="mb-0">{collection.title}</h3>
            <p className="mb-0">{collection.description}</p>
          </Link>
        </div>
        <div className="lg:w-1/2">
          <Link to={pathify(collection.title)}>
            <div className="flex max-w-xl mx-auto">
              <Img className="w-2/3 mr-2" fluid={{ ...collection.image1.image.childImageSharp.fluid }} alt={collection.image1.alt} />
              <div className="w-1/3">
                <div className="flex flex-col h-full">
                  <Img className="mb-2 h-half" fluid={{ ...collection.image2.image.childImageSharp.fluid }} alt={collection.image2.alt} />
                  <Img className="h-half" fluid={{ ...collection.image3.image.childImageSharp.fluid }} alt={collection.image3.alt} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

EachCollection.propTypes = {
  collection: PropTypes.object.isRequired,
};

export default EachCollection;
