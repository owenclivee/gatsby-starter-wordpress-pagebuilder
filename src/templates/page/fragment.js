
import { graphql } from "gatsby";

export const pageBuilderQuery = graphql`
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
                
      ... on WPGraphQL_Page_Pagebuilder_Layouts_FullWidth {
          layoutFile
          fieldGroupName
          components {
            ... on WPGraphQL_Page_Pagebuilder_Layouts_FullWidth_Components_Banner {
              fieldGroupName
              componentFile
              heading
              text
              image {
                sourceUrl
                altText
                imageFile {
                  childImageSharp {
                    fluid(maxHeight: 400, quality: 90, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
              }
            } 
 
          }
      }
   
 
            }
        }
    }
`;
