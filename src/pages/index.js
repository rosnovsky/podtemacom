import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Pagination from "../components/pagination"

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
    const { data } = this.props
    this.state = {
      pageOfItems: [],
      items: data.allMarkdownRemark.edges,
    }
    this.onChangePage = this.onChangePage.bind(this)
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems })
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const { pageOfItems } = this.state

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {pageOfItems.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {Intl.DateTimeFormat("ru-RU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(node.frontmatter.date))}
              </small>
              <div
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.audioUrl
                    ? `<img src="${node.frontmatter.cover.publicURL}" /><br/><audio
                  style=
                    "width: 100%;"
                  preload="true"
                  controls src="${node.frontmatter.audioUrl}" /><br/>`
                    : `<img src="${node.frontmatter.cover.publicURL}" /><br/>`,
                }}
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.html,
                }}
              />
            </div>
          )
        })}
        <div>
          <Pagination
            style={{ margin: "0 auto" }}
            items={this.state.items}
            onChangePage={this.onChangePage}
          />
          <br />
          <br />
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            cover {
              publicURL
            }
            audioUrl
          }
        }
      }
    }
  }
`
