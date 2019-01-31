import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Button } from 'native-base';
import SimpleHeader from './common/SimpleHeader';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Import the redux actions
import * as Actions from '../actions';

const posts = ['sample post 1', 'sample post 2', 'sample post 3'];

class PostList extends Component {
  constructor(props) {
    super(props);
    this.renderSamplePost = this.renderSamplePost.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    console.log('button pressed');
    this.props.getData();
  }

  renderSamplePost(postText) {
    return (
      <ListItem key={postText}>
        <Text>{postText}</Text>
      </ListItem>
    );
  }

  render() {
    console.log(`Loading? ${this.props.loading} data:`);
    console.log(this.props.data);
    return (
      <Container>
        <SimpleHeader title="Post List" />
        <Content>
          <List>{posts.map(postText => this.renderSamplePost(postText))}</List>
          <Button onPress={this.onButtonPress} disabled={!this.props.loading}>
            <Text>Fetch some data using a redux action</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

// This functions tells redux to give this component the specified parts of the app state
// that are governed by the reducers.
// The returned object becomes part of the component's "this.props"
function mapStateToProps(state, props) {
  return {
    loading: state.DataReducer.loading,
    data: state.DataReducer.data,
  };
}

// This functions tells redux to give this component access the the actions
// that we imported at the top of the file.
// The actions become part of the component's "this.props" as functions.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

// connect everything and export the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
