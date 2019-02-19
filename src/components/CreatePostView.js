import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import SimpleHeader from './common/SimpleHeader';

export default class CreatePostView extends Component {
  render() {
    return (
      <Container>
        <SimpleHeader title="Create Post" />
        <Content>
          <Text>TODO: Make the Create Post View</Text>
        </Content>
      </Container>
    );
  }
}
