import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

// Import the redux actions
import * as PostListActions from '../actions/postList';

class PostList extends Component {
  // Called as soon as the component is mounted.
  componentDidMount() {
    const { fetchPostList } = this.props;
    fetchPostList();
  }

  // Arrow functions auto-bind
  onMakePostButtonPress = () => {
    console.log('make post button pressed');
  };

  renderSamplePost = postText => (
    <ListItem key={postText}>
      <Text>{postText}</Text>
    </ListItem>
  );

  render() {
    const { posts, loadingPostList } = this.props;

    if (loadingPostList) {
      return (
        <Container>
          <SimpleHeader title="Post List" />
          <Content>
            <Text>Fetching posts...</Text>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <SimpleHeader title="Post List" />
        <Content>
          <List>{posts.map(postText => this.renderSamplePost(postText))}</List>
          <Button onPress={this.onMakePostButtonPress}>
            <Text>Make Post</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

// This functions tells redux to give this component the specified parts of the app state
// that are governed by the reducers.
// The returned object becomes part of the component's "this.props"
function mapStateToProps(state) {
  return {
    posts: state.PostListReducer.posts,
    loadingPostList: state.PostListReducer.loadingPostList,
  };
}

// This functions tells redux to give this component access the the actions
// that we imported at the top of the file.
// The actions become part of the component's "this.props" as functions.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostListActions, dispatch);
}

// connect everything and export the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
