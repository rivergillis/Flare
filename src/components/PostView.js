import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';
import PostCard from './common/PostCard';

// Import the redux actions
import * as PostListActions from '../actions/postList';

class PostView extends Component {
    componentDidMount() {
      const { fetchPostList } = this.props;
      fetchPostList();
    }


renderSamplePost = post => (
    <ListItem key={post.text}>
      <Text>{post.text}</Text>
    </ListItem>
  );

  render() {
    const { posts, loadingPostList } = this.props;
    console.log(posts);

    if (loadingPostList) {
      return (
        <Container>
          <SimpleHeader title="Flare Post" />
          <Content>
            <Text>Fetching posts...</Text>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <SimpleHeader title="Flare Post" />
        <Content>
          <List>{posts.map(post => this.renderSamplePost(post))}</List>
          <Button onPress={this.onMakePostButtonPress}>
            <Text>Make Post</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  }

function mapStateToProps(state) {
  return {
    posts: state.PostViewReducer.posts,
    loadingPostList: state.PostViewReducer.loadingPostList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostListActions, dispatch);
}

// connect everything and export the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView);