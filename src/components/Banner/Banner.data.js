module.exports = (layoutType) => {
  return `... on WPGraphQL_Page_Pagebuilder_Layouts_${layoutType}_Components_Banner {
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
            }`
};