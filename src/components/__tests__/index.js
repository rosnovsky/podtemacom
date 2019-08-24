import React from "react"
import ReactDOM from "react-dom"
import renderer from "react-test-renderer"

import Bio from "../bio"
import { useStaticQuery } from "gatsby"

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      avatar: {
        childImageSharp: {
          fixed: {
            base64: "foo",
            width: 1,
            height: 1,
            src: "foo",
            srcSet: "foo",
          },
        },
      },
      site: {
        siteMetadata: {
          author: `Mock author`,
          social: {
            twitter: "mockhandle",
          },
        },
      },
    }
  })
})

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<Bio />, div)
  ReactDOM.unmountComponentAtNode(div)
})
