const pathify = (str) => {
  return `/${str.trim().replace(/\s/g, '-').toLowerCase().replace('--', '-')}`;
};

export default pathify;
