import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
import SimpleHeader from './common/SimpleHeader';

export default class GeneralExample extends Component {
  render() {
    return (
      <Container>
        <SimpleHeader title="Post List" />
        <Content>
          <List>
            <ListItem>
              <Text>Sample post 1</Text>
            </ListItem>
            <ListItem>
              <Text>Sample post 2</Text>
            </ListItem>
            <ListItem>
              <Text>Sample post 3</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
