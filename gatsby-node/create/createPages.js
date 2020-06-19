const {getAllLayoutsData, createPageBuilderFragment} = require("../utils");

const filePathToFragmentTemplate = "../src/templates/page/fragment.template.js";
const filePathToWriteFragment = "src/templates/page/fragment.js";
const pageTemplate = require.resolve("../../src/templates/page/page.js");

const GET_PAGES = `
    query GET_PAGES($first:Int $after:String) {
        wpgraphql {
            pages(
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
                    id
                    uri
                    isFrontPage
                }
            }
        }
    }
`;

const itemsPerPage = 10;

/**
 * This is the exported function we use in gatsby-node, taking in the params gatsby provides to hook into it's create pages API https://www.gatsbyjs.org/docs/node-apis
 * @param required { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({actions, graphql}) => {

    const layoutsData = getAllLayoutsData();
    const {createPage} = actions;

    await createPageBuilderFragment({
        writeFilePath: filePathToWriteFragment,
        fragmentTemplatePath: filePathToFragmentTemplate,
        pageBuilderLayouts: layoutsData
    });

    /**
     * Fetch pages func run the query to get pages, but also recursively gets more once we've reach pagination limit (itemsPerPage var).
     * The variable `first` controls how many items to request per fetch and the `after` controls where to start in the dataset.
     * @param variables
     * @returns {Promise<*>}
     */
    const fetchPages = async (variables) => {

        return await graphql(GET_PAGES, variables).then(({data}) => {

            //obj destructure to expose variables (nodes holds page, and we've just renamed with : to pages)
            const {
                wpgraphql: {
                    pages: {
                        nodes: pages,
                        pageInfo: {hasNextPage, endCursor},
                    },
                },
            } = data;

            if (hasNextPage) {
                return fetchPages({first: itemsPerPage, after: endCursor});
            }

            return pages;
        });

    };

    return await fetchPages({first: itemsPerPage, after: null}).then((wpPages) => {

        if (wpPages) {
            wpPages.map((page) => {
                let pagePath = `/${page.uri}`;

                if (page.isFrontPage) {
                    pagePath = '/'
                }

                createPage({
                    path: pagePath,
                    component: pageTemplate,
                    context: {
                        id: page.id,
                    },
                });

            });
        }

    });
};