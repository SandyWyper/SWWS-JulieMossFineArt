// This component wraps every page and persists through page navigation.
// See 'gatsby-config.js' transition-link set-up

import React from 'react';

export default function index({ children }) {
  return (
    <div className="bg-red-200">
      <main>{children}</main>
    </div>
  );
}
