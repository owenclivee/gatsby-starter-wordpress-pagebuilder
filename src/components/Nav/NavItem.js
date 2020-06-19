import React from "react"
import Link from "../1-wrappers/Link"

const NavItem = ({menuItem}) => {
    console.log(menuItem)
    return (
        <Link style={{marginRight: '20px'}} to={menuItem.url}>{menuItem.label}</Link>
    )
};

export default NavItem