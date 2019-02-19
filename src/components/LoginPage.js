import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';
import SimpleHeader from './common/SimpleHeader';

export default class LoginPage extends Component {
  // Just log in for now
  onLoginPress = () => {
    const { navigation } = this.props;
    navigation.navigate('PostList');
  };

  render() {
    return (
      <Container>
        <SimpleHeader title="Flare - Login" />
        <Content>
          <Button onPress={this.onLoginPress}>
            <Text>Log in</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
