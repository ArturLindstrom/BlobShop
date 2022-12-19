import * as React from "react";
import { graphql } from "gatsby";
import { PageType } from "../types/pageType";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Layout from "../components/Layout";

export const query = graphql`
  query ($id: String!) {
    contentfulPage(id: { eq: $id }) {
      title
      slug
      body {
        raw
      }
    }
  }
`;

export default function page({ data }: PageType) {
  const page = data.contentfulPage;
  return (
    <Layout>
      <h1>{page.title}</h1>
      {/* @ts-ignore */}
      <div>{renderRichText(page.body)}</div>
    </Layout>
  );
}
