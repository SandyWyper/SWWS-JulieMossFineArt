import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

const EachCollection = ({ collection }) => {
  return (
    <>
      <div className="lg:flex-row-reverse lg:flex lg:items-end">
        <div className="max-w-lg lg:w-1/2 lg:pl-8">
          <Link to={`/${collection.title.replace(' ', '-').toLowerCase()}`}>
            <h3>{collection.title}</h3>
          </Link>
          <p className="lg:mb-0">{collection.description}</p>
        </div>
        <div className="lg:w-1/2">
          <Link to={`/${collection.title.replace(' ', '-').toLowerCase()}`}>
            <div className="flex max-w-lg ">
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
