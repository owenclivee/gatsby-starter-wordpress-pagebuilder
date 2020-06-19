import React from "react";
import MainLayout from "../../components/MainLayout";
import PostEntry from "../../components/2-blog/PostEntry";
import Pagination from "../../components/2-blog/Pagination";
import SEO from "../../components/SEO";

const Blog = ({ pageContext }) => {
    const { nodes, pageNumber, hasNextPage, itemsPerPage, allPosts } = pageContext;

    return (
        <MainLayout>
            <SEO
                title="Blog"
                description="Blog posts"
                keywords={[`blog`]}
            />

            {nodes && nodes.map(post => <PostEntry key={post.postId} post={post}/>)}

            <Pagination
                pageNumber={pageNumber}
                hasNextPage={hasNextPage}
                allPosts={allPosts}
                itemsPerPage={itemsPerPage}
            />
        </MainLayout>
    )
};

export default Blog;