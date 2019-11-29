import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Profile from "../components/Profile"
import { rhythm } from "../utils/typography"

const Account = props => {
  const siteTitle = props.data.site.siteMetadata.title
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Account" />
      <Profile />
    </Layout>
  )
}

export default Account

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
