import React from "react";
import { Link } from "gatsby";
import { blogURI } from "../../../globals";
import FluidImage from "./../1-wrappers/FluidImage";

const PostEntry = ({ post }) => {

    const { uri, title, featuredImage, excerpt } = post;

    return (
        <div style={{ marginBottom: "30px" }}>
            <header>
                <Link to={`${blogURI}/${uri}/`}>
                    <h2 style={{ marginBottom: "5px" }}>{title}</h2>
                    <FluidImage image={featuredImage} style={{ margin: 0 }}/>
                </Link>

            </header>

            <div dangerouslySetInnerHTML={{ __html: excerpt }}/>
        </div>
    )
};

export default PostEntry;
