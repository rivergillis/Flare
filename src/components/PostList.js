import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Card,
  Body,
} from 'native-base';
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
    const { navigation } = this.props;
    navigation.navigate('CreatePostView');
  };

  onPostPress = post => {
    const { navigation } = this.props;
    navigation.navigate('PostView', { ...post.text });
  };

  // TODO: Make these clickable and send to the PostView page passing along the
  // post itself as a parameter. See https://reactnavigation.org/docs/en/params.html
  // TODO: Fix styling for post cards
  renderPost = post => (
    <ListItem key={post.text}>
      <TouchableOpacity key={post.text} onPress={this.onPostPress}>
        <Card pointerEvents="none">
          <Body>
            <Text>{post.text}</Text>
          </Body>
        </Card>
      </TouchableOpacity>
    </ListItem>
  );

  render() {
    const { posts, loadingPostList } = this.props;
    console.log(posts);

    if (loadingPostList) {
      return (
        <Container>
          <SimpleHeader title="Flare Feed" />
          <Content>
            <Text>Fetching posts...</Text>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <SimpleHeader title="Flare Feed" />
        <Content>
          <List>{posts.map(post => this.renderPost(post))}</List>
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
