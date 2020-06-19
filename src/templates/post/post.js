import React from "react";

import MainLayout from "../../components/MainLayout";
import SEO from "../../components/SEO";
import FluidImage from "../../components/1-wrappers/FluidImage";


const Post = ({ pageContext }) => {
    const {
        post: { title, content, featuredImage },
    } = pageContext;

    return (
        <MainLayout>
            <SEO title={title}/>

            <FluidImage image={featuredImage} style={{ marginBottom: "15px" }}/>

            <h1> {title} </h1>
            <div dangerouslySetInnerHTML={{ __html: content }}/>
        </MainLayout>
    )
};

export default Post;
