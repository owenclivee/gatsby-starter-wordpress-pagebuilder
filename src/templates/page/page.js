import React from "react"
import {graphql} from 'gatsby';
import MainLayout from "../../components/MainLayout"
import SEO from "../../components/SEO"
import AllLayouts from "../../components/1-wrappers/AllLayouts"

export const pageQuery = graphql`
    query PageQuery($id: ID!) {
        wpgraphql {
            page(id: $id) {
                title
                ...PageBuilderFragment
            }
        }
    }
`;

const Page = ({ data }) => {
    const {
        wpgraphql: {
            page: {title, pageBuilder}
        }
    } = data;

    const layouts = pageBuilder.layouts || [];

    return (
        <MainLayout>
            <SEO title={title}/>
            <h1> {title} </h1>

            {
                layouts.map((layout, index) => {
                    return <AllLayouts key={index} layout={layout}/>
                })
            }

        </MainLayout>
    )
};

export default Page;