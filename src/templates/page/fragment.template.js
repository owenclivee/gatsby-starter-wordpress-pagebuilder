module.exports = (layouts) => {
return `
import { graphql } from "gatsby";

export const pageBuilderQuery = graphql\`
    fragment PageBuilderFragment on WPGraphQL_Page {
        id
        title
        pageId
        content
        uri
        slug
        isFrontPage
        featuredImage {
            sourceUrl
            altText
            imageFile {
                childImageSharp {
                    fluid(maxHeight: 400, maxWidth: 800, quality: 90, cropFocus: CENTER) {
                        ... on ImageSharpFluid {
                            tracedSVG
                            aspectRatio
                            src
                            srcSet
                            sizes
                        }
                    }
                }
            }
        }
        pageBuilder {
            layouts {
                ${layouts}
            }
        }
    }
\`;
`};