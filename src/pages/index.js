import React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

const BlogLink = styled(Link)`
  text-decoration: none;
`;

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: red;
`;

export default ({ data }) => {
  const { totalCount, edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1>My thoughts</h1>
        <h4>{totalCount}</h4>
        {edges.map(({ node }) => {
          const { frontmatter, excerpt, id, fields } = node;
          const { title, date } = frontmatter;

          return (
            <div key={id}>
              <BlogLink to={fields.slug}>
                <BlogTitle>
                  {title} - {date}
                </BlogTitle>
              </BlogLink>
              <p>{excerpt}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
