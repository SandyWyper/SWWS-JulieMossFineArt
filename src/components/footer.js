import React from 'react';
import { Link } from 'gatsby';

const Footer = () => {
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Art', path: '/collections' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="w-full text-white bg-gray-900 border-t-2 border-gray-300">
      <div className="max-w-5xl py-4 mx-auto">
        <ul className="px-4">
          {footerLinks.map((link, i) => (
            <li className="footer-link" key={`footer-link-${i}`}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
