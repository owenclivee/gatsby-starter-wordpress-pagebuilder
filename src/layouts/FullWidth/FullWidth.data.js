module.exports = (components) => {
  return `
      ... on WPGraphQL_Page_Pagebuilder_Layouts_FullWidth {
          layoutFile
          fieldGroupName
          components {
            ${components}
          }
      }
  `
}
