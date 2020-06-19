import React from "react"
import {StaticQuery, graphql} from "gatsby"
import NavItem from "./NavItem"

/**
 * Define NavItem fragment and get all primary menu items.
 */
const MENU_QUERY = graphql`

    fragment NavItem on WPGraphQL_MenuItem {
        id
        label
        url
        title
        target
    }

    query GETMAINMENU {
        wpgraphql {
            menuItems(where: {location: MENU_1}) {
                nodes {
                    ...NavItem
                    childItems {
                        nodes {
                            ...NavItem
                            childItems {
                                nodes {
                                    ...NavItem
                                }
                            }
                        }
                    }
                }
            }
            generalSettings {
                url
            }
        }
    }
`;

const Menu = () => {
    return (
        <StaticQuery
            query={MENU_QUERY}
            render={(data) => {
                if (data.wpgraphql.menuItems) {
                    const menuItems = data.wpgraphql.menuItems.nodes;
                    const wordPressUrl = data.wpgraphql.generalSettings.url;

                    return (
                        <div style={{marginBottom: "20px"}}>
                            {
                                menuItems &&
                                menuItems.map((menuItem) => (
                                    <NavItem key={menuItem.id} menuItem={menuItem} wordPressUrl={wordPressUrl}/>
                                ))
                            }
                        </div>
                    )
                }
                return null
            }}
        />
    )
};

export default Menu