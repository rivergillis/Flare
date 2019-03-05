import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import SimpleHeader from './common/SimpleHeader';

export default class CreatePostView extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <SimpleHeader title="Create Post" isBack navigation={navigation} />
        <Content>
          <Text>TODO: Make the Create Post View</Text>
        </Content>
      </Container>
    );
  }
}
