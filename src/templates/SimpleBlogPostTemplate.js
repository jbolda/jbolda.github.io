import React from "react";
import { graphql } from "gatsby";
import SimpleChromeBridge from "../utils/SimpleChromeBridge";

class SimpleBlogPostTemplate extends React.Component {
  render() {
    const { html, frontmatter } = this.props.data.post;

    return (
      <SimpleChromeBridge
        post={this.props.data.post}
        hero={this.props.data.hero}
        location={this.props.location}
      >
        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
      </SimpleChromeBridge>
    );
  }
}

export default SimpleBlogPostTemplate;

export const pageQuery = graphql`
  query SimpleBlogPostTemplatePostBySlug($slug: String!, $heroImage: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        path
        layoutType
        writtenPretty: written(formatString: "MMMM Do YYYY")
        updatedPretty: updated(formatString: "MMMM Do YYYY")
        written
        updated
        category
        description
      }
    }
    hero: file(relativePath: { eq: $heroImage }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;
