import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import SimpleHeader from './common/SimpleHeader';

class PostView extends Component {
  render() {
    const { navigation } = this.props;
    const post = navigation.getParam('post', null);
    const comments = navigation.getParam('comments', null);

    return (
      <Container>
        <SimpleHeader title="Flare Post" isBack navigation={navigation} />
        <Content>
          <Text>
            activePost: {post.text} comments? {comments.length}
          </Text>
        </Content>
      </Container>
    );
  }
}

// connect everything and export the component
export default PostView;
