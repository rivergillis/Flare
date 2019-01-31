import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store'; // Import the redux store
import PostList from './components/PostList';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PostList />
      </Provider>
    );
  }
}
