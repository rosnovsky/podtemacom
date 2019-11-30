import React from 'react';
import { Link } from 'gatsby';
import { logout, isAuthenticated, getProfile } from '../utils/auth';

import { rhythm, scale } from '../utils/typography';

const Layout = props => {
  const { location, title, children } = props;
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;
  let user;

  if (!isAuthenticated()) {
    user = null;
  }else{
		user = JSON.parse(localStorage.getItem('user'));
	}

  if (location.pathname === rootPath) {
    header = (
      <>
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
        <nav>
          <Link to={`/account`}>Account</Link>
          {user !== null ?
            <>
              <Link to="/account/settings">Settings</Link>
              <Link to="/account/billing">Billing</Link>
              <a
                href="#logout"
                onClick={e => {
                  logout();
                  e.preventDefault();
                }}
              >
                Log Out
              </a>
            </> : ''
          }
        </nav>
      </>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
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
    );
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}, Artem Rosnovsky</footer>
    </div>
  );
};

export default Layout;
