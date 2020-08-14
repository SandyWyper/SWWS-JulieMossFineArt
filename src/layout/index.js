// This component wraps every page and persists through page navigation.
// See 'gatsby-config.js' transition-link set-up

import React from 'react';
import Nav from './nav';

export default function index({ children }) {
  return (
    <div className="relative bg-red-200">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
