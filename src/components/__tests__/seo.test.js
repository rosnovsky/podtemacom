import React from "react"
import ReactDOM from "react-dom"
import { render } from "@testing-library/react"

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
        },
      },
    }
  })
})

describe("Bio Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Bio />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it("renders correctly", () => {
    const bio = render(<Bio />)
    expect(bio).toMatchSnapshot()
  })
})
