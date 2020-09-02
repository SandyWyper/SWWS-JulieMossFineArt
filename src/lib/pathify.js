const pathify = (str) => {
  return `/${str.trim().replace(/\s/g, '-').toLowerCase()}`;
};

export default pathify;
