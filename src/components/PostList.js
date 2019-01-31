import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
import SimpleHeader from './common/SimpleHeader';

const posts = ['sample post 1', 'sample post 2', 'sample post 3'];

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.renderSamplePost = this.renderSamplePost.bind(this);
  }

  renderSamplePost(postText) {
    return (
      <ListItem key={postText}>
        <Text>{postText}</Text>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <SimpleHeader title="Post List" />
        <Content>
          <List>{posts.map(postText => this.renderSamplePost(postText))}</List>
        </Content>
      </Container>
    );
  }
}
