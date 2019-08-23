import React from "react";
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer"

import Bio from "../bio"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bio />, div);
  ReactDOM.unmountComponentAtNode(div);
});