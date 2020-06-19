const {
    FluidImageFragment,
    PostTemplateFragment,
    BlogPreviewFragment,
} = require("../fragments.js");

const {blogURI} = require("../../globals");

const postTemplate = require.resolve("../../src/templates/post/post.js");
const blogTemplate = require.resolve("../../src/templates/post/blog.js");


const GET_POSTS = `
    # Here we are exposing the fragment variables to the graphQL statement so we can spread them into the query
    ${PostTemplateFragment}
    ${BlogPreviewFragment}
    ${FluidImageFragment}

    query GET_POSTS($first:Int $after:String) {
        wpgraphql {
            posts(
                first: $first
                after: $after
                # This will make sure to only get the parent nodes and no children
                where: {
                    parent: null
                }
            ) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                nodes {                
                    uri     
                    ...PostTemplateFragment
                    ...BlogPreviewFragment
                }
            }
        }
    }
`;

const allPosts = [];
const blogPages = [];
let pageNumber = 0;
const itemsPerPost = 10;

/**
 * This is the exported function we use in gatsby-node, taking in the params gatsby provides to hook into it's create pages API https://www.gatsbyjs.org/docs/node-apis
 * @param required { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({actions, graphql}) => {

    const {createPage} = actions;
    /**
     * Fetch posts func run the query to get posts, but also recursively gets more once we've reach pagination limit (itemsPerPage var).
     * The variable `first` controls how many items to request per fetch and the `after` controls where to start in the dataset.
     * @param variables
     * @returns {Promise<*>}
     */
    const fetchPosts = async (variables) =>

        await graphql(GET_POSTS, variables).then(({data}) => {

            //obj destructure to expose variables
            const {
                wpgraphql: {
                    posts: {
                        nodes,
                        pageInfo: {hasNextPage, endCursor},
                    },
                },
            } = data;

            /**
             * Define the path for the paginated blog page.
             * This is the url the page will live at
             * @type {string}
             */
            const blogPagePath = !variables.after
                ? `${blogURI}/`
                : `${blogURI}/page/${pageNumber + 1}`;

            /**
             * Add config for the blogPage to the blogPage array
             * for creating later
             *
             * @type {{
             *   path: string,
             *   component: string,
             *   context: {nodes: *, pageNumber: number, hasNextPage: *}
             * }}
             */
            blogPages[pageNumber] = {
                path: blogPagePath,
                component: blogTemplate,
                context: {
                    nodes,
                    pageNumber: pageNumber + 1,
                    hasNextPage,
                    itemsPerPost,
                    allPosts,
                },
            };

            /**
             * Map over the posts for later creation
             */
            nodes
            && nodes.map((posts) => {
                allPosts.push(posts)
            });

            if (hasNextPage) {
                pageNumber++;
                return fetchPosts({first: itemsPerPost, after: endCursor});
            }

            return allPosts;
        });

    await fetchPosts({first: itemsPerPost, after: null}).then((wpPosts) => {

        if (wpPosts) {
            wpPosts.map((post) => {
                const path = `${blogURI}/${post.uri}/`;

                createPage({
                    path: path,
                    component: postTemplate,
                    context: {
                        post: post,
                    },
                });
            });
        }

        /**
         * Map over the `blogPages` array to create the
         * paginated blog pages
         */
        if (blogPages) {
            blogPages.map((blogPage) => {
                if (blogPage.context.pageNumber === 1) {
                    blogPage.context.publisher = true;
                    blogPage.context.label = blogPage.path.replace('/', '');
                }
                createPage(blogPage);
            });
        }
    });
};