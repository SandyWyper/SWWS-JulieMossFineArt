import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

const EachCollection = ({ collection }) => {
  return (
    <>
      <Link to={`/${collection.title.replace(' ', '-').toLowerCase()}`}>
        <h3>{collection.title}</h3>
      </Link>
      <p>{collection.description}</p>
      <div className="max-w-lg">
        <Img className="mb-2" fluid={{ ...collection.image1.image.childImageSharp.fluid }} alt={collection.image1.alt} />
        <div className="flex">
          <div className="w-1/2 pr-1">
            <Img className="" fluid={{ ...collection.image2.image.childImageSharp.fluid }} alt={collection.image2.alt} />
          </div>
          <div className="w-1/2 pl-1">
            <Img className="" fluid={{ ...collection.image3.image.childImageSharp.fluid }} alt={collection.image3.alt} />
          </div>
        </div>
      </div>
    </>
  );
};

EachCollection.propTypes = {
  collection: PropTypes.object.isRequired,
};

export default EachCollection;
