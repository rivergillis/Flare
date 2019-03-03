import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Icon,
  Right,
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
    const { navigation, postComments } = this.props;
    navigation.navigate('PostView', {
      post,
      comments: postComments[post.docId],
    });
  };

  // TODO: Use a better key
  // TODO: Fix these styles
  renderPost = post => {
    const { postComments } = this.props;
    const comments = postComments[post.docId];
    const numComments = comments ? comments.length : 0;
    return (
      <CardItem
        key={post.text}
        button
        bordered
        onPress={() => this.onPostPress(post)}
      >
        <Text>{post.text}</Text>
        <Right>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="md-repeat" />
            <Text>{` ${post.reposts}    `}</Text>
            <Icon name="md-chatboxes" />
            <Text>{` ${numComments}`}</Text>
          </View>
        </Right>
      </CardItem>
    );
  };

  render() {
    const { posts, loadingPostList, userData } = this.props;
    console.log(userData);

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
          <Card>{posts.map(post => this.renderPost(post))}</Card>
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
    userData: state.AuthReducer.userData,
    posts: state.PostListReducer.posts,
    loadingPostList: state.PostListReducer.loadingPostList,
    postComments: state.PostListReducer.postComments,
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
