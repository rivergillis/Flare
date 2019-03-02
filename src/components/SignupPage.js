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
  Toast,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

import * as AuthActions from '../actions/auth';

class SignupPage extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidUpdate = () => {
    const { auth, ackLoginFail } = this.props;
    if (auth.user) {
      const { navigation } = this.props;
      navigation.navigate('PostList');
    } else if (auth.failedCreatingUser) {
      Toast.show({ text: 'Could not sign up :(', buttonText: 'Okay' });
      ackLoginFail();
    }
  };

  onSignupPress = () => {
    const { createUserAndLogin } = this.props;
    const { email, password } = this.state;
    createUserAndLogin(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { auth } = this.props;

    const signupText = auth.creatingUser ? 'Creating user...' : 'Sign up';

    return (
      <Container>
        <SimpleHeader title="Sign up" />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                value={email}
                onChangeText={text => this.setState({ email: text })}
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
          <Button onPress={this.onSignupPress} disabled={auth.creatingUser}>
            <Text>{signupText}</Text>
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
)(SignupPage);
