import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import Pagination from '../pagination';
import { useStaticQuery } from 'gatsby';

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      avatar: {
        childImageSharp: {
          fixed: {
            base64: 'foo',
            width: 1,
            height: 1,
            src: 'foo',
            srcSet: 'foo',
          },
        },
      },
      site: {
        siteMetadata: {
          author: 'Mock author',
        },
      },
    };
  });
});

describe('Pagination Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pagination />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const pagination = render(<Pagination />);
    expect(pagination).toMatchSnapshot();
  });
});
