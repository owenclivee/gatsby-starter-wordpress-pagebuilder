const createPages = require("./gatsby-node/create/createPages");
const createPosts = require("./gatsby-node/create/createPosts");
const {createRemoteFileNode} = require(`gatsby-source-filesystem`);
const {createComponentNode, createResolverField} = require(`gatsby-plugin-graphql-component`);


exports.createPagesStatefully = async ({graphql, actions}) => {
    await createPages({actions, graphql});
    await createPosts({actions, graphql});
};

exports.sourceNodes = async ({actions}) => {
    const {createNode} = actions;
    createNode(createComponentNode({component: require.resolve(`./src/components/Banner/Banner.js`)}))
    createNode(createComponentNode({component: require.resolve(`./src/layouts/FullWidth/FullWidth.js`)}))
};

exports.createResolvers = async (
    {
        actions,
        cache,
        createNodeId,
        createResolvers,
        store,
        reporter,
    },
) => {
    const {createNode} = actions;

    await createResolvers({
        WPGraphQL_MediaItem: {
            imageFile: {
                type: "File",
                async resolve(source) {
                    let sourceUrl = source.sourceUrl

                    if (source.mediaItemUrl !== undefined) {
                        sourceUrl = source.mediaItemUrl
                    }

                    return await createRemoteFileNode({
                        url: encodeURI(sourceUrl),
                        store,
                        cache,
                        createNode,
                        createNodeId,
                        reporter,
                    })
                },
            },
        },
        WPGraphQL_Page_Pagebuilder_Layouts_FullWidth: {
            layoutFile: createResolverField({component: require.resolve(`./src/layouts/FullWidth/FullWidth.js`)})
        },
        WPGraphQL_Page_Pagebuilder_Layouts_FullWidth_Components_Banner: {
            componentFile: createResolverField({component: require.resolve(`./src/components/Banner/Banner.js`)})
        },
    })
};