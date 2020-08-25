// make this method available for adding new nodes
const { createFilePath } = require(`gatsby-source-filesystem`);
// for handling frontmatter images with netlify CMS
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
// lodash function for organising collections
var groupBy = require('lodash.groupby');

// -------------------------------------------------------------------   This is a utility for logging out objetcs
// const util = require('util');
// console.log(util.inspect(blogPosts, { showHidden: false, depth: null }));
// -----------------------------------------------------------------------------------------------------------------  ///

//-------------- Create slugs for every Blog and Artwork post ------------//

// create nodes on markdown to indicate path
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // for handling frontmatter images with netlify CMS
  fmImagesToRelative(node);

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

// / --------------  Create pages for Blog posts, each piece of art, landing pages for art collections, landing page for blog posts ------------------ //////
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // templates
  const blogLandingTemplate = require.resolve(`./src/templates/blogLandingTemplate.js`);
  const blogTemplate = require.resolve(`./src/templates/blogTemplate.js`);
  const collectionTemplate = require.resolve(`./src/templates/collectionTemplate.js`);
  const artworkTemplate = require.resolve(`./src/templates/artworkTemplate.js`);

  /// -- Order the results by date, declared in frontmatter
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  /// ------------------------------------ Create pages for blog articles and landing page---------------------  ///
  // / --- I must query allMarkdownRemark for posts test them against a regex value in order to get only the ones with '/blog/' in the slug ---- ///
  // / --- Then create however many landing pages are needed to allow for pagination --------------------  ///
  // / --- Feed the template with some variables to tell that page which and how many articles to show --- ///
  const articles = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/blog/" } } }, sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            fields {
              slug
            }
            id
            frontmatter {
              title
              date(formatString: "DD/MM/YYYY")
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (articles.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create blog-list pages
  const blogPosts = articles.data.allMarkdownRemark.edges;
  const blogPostsPerPage = 6;
  const numBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage);
  Array.from({ length: numBlogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogLandingTemplate,
      context: {
        limit: blogPostsPerPage,
        skip: i * blogPostsPerPage,
        numBlogPages,
        currentPage: i + 1,
      },
    });
  });

  // Create pages for each blog post
  blogPosts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: blogTemplate,
      context: {
        // additional data can be passed via context
        slug: node.fields.slug,
        prev: index === 0 ? null : blogPosts[index - 1].node.fields.slug,
        next: index === blogPosts.length - 1 ? null : blogPosts[index + 1].node.fields.slug,
      },
    });
  });
  // /// ------------------------------------ Create artwork collection pages---------------------  ///
  const artworkData = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/artwork/" } } }, sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            fields {
              slug
            }
            id
            frontmatter {
              title
              date(formatString: "DD/MM/YYYY")
              category
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (artworkData.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Simplify data tree
  const artwork = artworkData.data.allMarkdownRemark.edges;
  // organise artworks into their categories
  const grouped = groupBy(artwork, function (item) {
    return item.node.frontmatter.category;
  });
  // const collectionCategories = Object.keys(grouped);

  // Number of artworks to display per page
  const artworkPerPagePerCollection = 30;
  // Create art collections pages
  for (const category in grouped) {
    const numCollectionPages = Math.ceil(grouped[category].length / artworkPerPagePerCollection);

    Array.from({ length: numCollectionPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${category.replace(' ', '-').toLowerCase()}` : `/${category.replace(' ', '-').toLowerCase()}${i + 1}`,
        component: collectionTemplate,
        context: {
          limit: artworkPerPagePerCollection,
          skip: i * artworkPerPagePerCollection,
          totalPages: numCollectionPages,
          currentPage: i + 1,
          collectionName: category,
          artworkNav: true,
        },
      });
    });
    // /// ------------------------------------ Create individual artwork pages---------------------  ///
    grouped[category].forEach(({ node }, index) => {
      createPage({
        path: node.fields.slug,
        component: artworkTemplate,
        context: {
          // additional data can be passed via context
          slug: node.fields.slug,
          prev: index === 0 ? null : grouped[category][index - 1].node.fields.slug,
          next: index === grouped[category].length - 1 ? null : grouped[category][index + 1].node.fields.slug,
          artworkNav: true,
        },
      });
    });
  }

  // // Create pages for each blog post
  // artwork.forEach(({ node }, index) => {
  //   createPage({
  //     path: node.fields.slug,
  //     component: blogTemplate,
  //     context: {
  //       // additional data can be passed via context
  //       slug: node.fields.slug,
  //       prev: index === 0 ? null : artwork[index - 1].node.fields.slug,
  //       next: index === artwork.length - 1 ? null : artwork[index + 1].node.fields.slug,
  //       artworkNav: true,
  //     },
  //   });
  // });
};

/// ------------------------------------------------------------------------------------------------  ///
