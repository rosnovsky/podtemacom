import React from 'react';
import { graphql } from 'gatsby';
import { login, isAuthenticated } from '../utils/auth';
import { FaCheckCircle } from 'react-icons/fa';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Account = props => {
  const siteTitle = props.data.site.siteMetadata.title;
  let user = {};
  if (!isAuthenticated()) {
    login();
    return <p>Redirecting to login...</p>;
  } else {
    user = JSON.parse(localStorage.getItem('user'));
  }
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Account" />
      <h1>Hi, {user.name ? `${user.name}!` : 'stranger!'}</h1>
      <p>
        Your email address is{' '}
        {user.email ? (
          <>
            <span>{user.email}</span>
            &nbsp;
            <span>
              {user.email_verified ? <FaCheckCircle /> : <FaCheckCircle />}
            </span>
          </>
        ) : (
          'not known to me'
        )}
      </p>
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
