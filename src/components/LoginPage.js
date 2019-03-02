import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

import * as AuthActions from '../actions/auth';

class LoginPage extends Component {
  state = {
    username: 'test@test.com',
    password: 'password',
  };

  // Just log in for now
  onLoginPress = () => {
    const { loginUser } = this.props;
    loginUser();
    // const { navigation } = this.props;
    // navigation.navigate('PostList');
  };

  render() {
    const { username, password } = this.state;
    const { auth } = this.props;

    const loginText = auth.loggingIn ? 'Logging in...' : 'Log in';

    return (
      <Container>
        <SimpleHeader title="Flare - Login" />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                value={username}
                onChangeText={text => this.setState({ username: text })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry
                value={password}
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
          </Form>
          <Button onPress={this.onLoginPress} disabled={auth.loggingIn}>
            <Text>{loginText}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.AuthReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
