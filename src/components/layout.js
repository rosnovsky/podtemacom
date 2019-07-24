import React from "react"
import { Link } from "gatsby"
import Pagination from "../components/pagination";

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageOfItems: [],
      items: this.props.children[2],
    }
    this.onChangePage = this.onChangePage.bind(this);
  }
  
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    const { location, title, children } = this.props
    const { pageOfItems } = this.state;
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Open Sans, serif',
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{pageOfItems}
        <Pagination items={this.state.items} onChangePage={this.onChangePage} /><br />
        </main>
        <br />
        <div>
        <footer>
      © 2006-{new Date().getFullYear()}
      {` `}
      <a href="https://rosnovsky.us">Rosnovsky Park™</a>
    </footer>
        </div>
      </div>
      
    </>
    )
  }
}

export default Layout
