import React from 'react';
import { Link, graphql } from 'gatsby';
import { Router } from '@reach/router';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Profile from '../components/Profile';
import { login, logout, isAuthenticated, getProfile } from '../utils/auth';
import { rhythm } from '../utils/typography';

const Account = props => {
  const siteTitle = props.data.site.siteMetadata.title;

  if (!isAuthenticated()) {
    login();
    return <p>Redirecting to login...</p>;
  }

  const user = getProfile();

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Account" />
      <nav>
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
      </nav>
      {/* <Router>
      </Router> */}
      <Profile user={user} />
    </Layout>
  );
};

export default Account;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
