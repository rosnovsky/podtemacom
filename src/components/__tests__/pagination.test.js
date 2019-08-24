import React from "react"
import ReactDOM from "react-dom"
import { render } from "@testing-library/react"

import Pagination from "../pagination"
import { useStaticQuery } from "gatsby"




describe("Pagination Component", () => {
    it("renders without crashing", () => {

        const items =
            [{
                allMarkdownRemark: {
                    edges: {
                        node: {
                            frontmatter: {
                                title: "Test"
                            }
                        }
                    }
                }
            }]

        console.log(items)

        const div = document.createElement("div")
        ReactDOM.render(<Pagination items={items} />, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it("renders correctly", () =>{
        
        const pagination = render(<Pagination />)
        expect(pagination).toMatchSnapshot()

    })



})
