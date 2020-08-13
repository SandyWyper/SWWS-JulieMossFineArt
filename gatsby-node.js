//-------------- Create slugs for every Blog and Artwork post ------------//

const { createFilePath } = require(`gatsby-source-filesystem`);

// for handling frontmatter images with netlify CMS
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
// exports.onCreateNode = ({ node }) => {
//   fmImagesToRelative(node);
// };

// lodash function for organising collections
var groupBy = require('lodash.groupby');

// create nodes on markdown to indicate path
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
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

// / --------------------  Create pages for Blog posts, each piece of art, landing pages for art collections, landing page for blog posts---------------------------- //////
/// -- Order the results by date, declared in frontmatter
/// -- If the slug created in the node conatins 'projects' then feed the contents of that page to the projects template
/// -- Else, use the blog template
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // templates
  const blogTemplate = require.resolve(`./src/templates/blogTemplate.js`);
  const artworkTemplate = require.resolve(`./src/templates/artworkTemplate.js`);
  const blogLandingTemplate = require.resolve(`./src/templates/blogLandingTemplate.js`);
  const collectionTemplate = require.resolve(`./src/templates/collectionTemplate.js`);

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

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.fields.slug.includes('blog')) {
      createPage({
        path: node.fields.slug,
        component: blogTemplate,
        context: {
          // additional data can be passed via context
          slug: node.fields.slug,
        },
      });
    } else if (node.fields.slug.includes('artwork')) {
      createPage({
        path: node.fields.slug,
        component: artworkTemplate,
        context: {
          // additional data can be passed via context
          slug: node.fields.slug,
        },
      });
    }
  });

  /// ------------------------------------ Create landing page for blog articles ---------------------  ///
  // / --- I must query allMarkdownRemark for posts test them against a regex value in order to get only the ones with '/blog/' in the slug ---- ///
  // / --- Then create however many landing pages are needed to allow for pagination --------------------  ///
  // / --- Feed the template with some variables to tell that page which and how many articles to show --- ///
  const articles = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/blog/" } } }, sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
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
        homeLayout: false,
        navTitle: 'blog',
      },
    });
  });

  // /// ------------------------------------ Create artwork collection pages---------------------  ///
  const artworkData = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/artwork/" } } }, sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
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

  const artwork = artworkData.data.allMarkdownRemark.edges;
  // const util = require('util');
  // console.log(util.inspect(artwork, { showHidden: false, depth: null }));
  const grouped = groupBy(artwork, function (item) {
    return item.node.frontmatter.category;
  });

  const collectionCategories = Object.keys(grouped);

  // Create art collections pages
  const artworkPerPagePerCollection = 20;
  for (const category in grouped) {
    const numCollectionPages = Math.ceil(grouped[category].length / artworkPerPagePerCollection);
    Array.from({ length: numCollectionPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${category.toLowerCase()}` : `/${category.toLowerCase}${i + 1}`,
        component: collectionTemplate,
        context: {
          limit: artworkPerPagePerCollection,
          skip: i * artworkPerPagePerCollection,
          totalPages: numCollectionPages,
          currentPage: i + 1,
          collectionName: category,
        },
      });
    });
  }

  // grouped.((x) => {
  //   console.log(util.inspect(x, { showHidden: false, depth: null }));
  // });
  // console.log('grouped:', util.inspect(grouped, { showHidden: false, depth: null }));

  // Create projects-list pages
  // const projectPosts = collections.data.allMarkdownRemark.edges;
  // const projectsPostsPerPage = 6;
  // const numProjectPages = Math.ceil(projectPosts.length / projectsPostsPerPage);
  // Array.from({ length: numProjectPages }).forEach((_, i) => {
  //   createPage({
  //     path: i === 0 ? `/projects` : `/projects/${i + 1}`,
  //     component: projectsLandingTemplate,
  //     context: {
  //       limit: projectsPostsPerPage,
  //       skip: i * projectsPostsPerPage,
  //       numProjectPages,
  //       currentPage: i + 1,
  //       homeLayout: false,
  //       navTitle: 'projects',
  //     },
  //   });
  // });
};
/// ------------------------------------------------------------------------------------------------  ///
