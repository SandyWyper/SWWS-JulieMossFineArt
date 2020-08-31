import React from 'react';
import { Link } from 'gatsby';

export default function typographyTest() {
  return (
    <div className="p-24">
      <h1>This is an h1</h1>
      <h2>This is an h2</h2>
      <h3>This is an h3</h3>
      <h4>This is an h4</h4>
      <h5>This is an h5</h5>
      <h6>This is an h6</h6>
      <hr />
      <p>This is how a paragrph tag looks like</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum
      </p>
      <blockquote>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
        inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      </blockquote>
      <Link to="/" className="btn">
        A Link Back To Home
      </Link>
    </div>
  );
}
