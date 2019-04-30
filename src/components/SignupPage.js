import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
  View,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

import * as AuthActions from '../actions/auth';

const stylesLogo = StyleSheet.create({
  flareLogo: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 60,
  },
});

const stylesSignUp = StyleSheet.create({
  ContSignUp: {
    paddingTop: 260,
    alignItems: 'center',
  },
  buttonSignUp: {
    marginBottom: 30,
    width: 260,
    height: 55,
    alignItems: 'center',
    backgroundColor: '#e21d16',
  },
  buttonTextSignUp: {
    padding: 16,
    color: '#FFFFFF',
  },
  buttonDisabledSignUp: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#a0a0a0',
  },
});

// Render the signup page
class SignupPage extends Component {
  state = {
    email: '',
    password: '',
    username: '',
  };

  // Check if the user signed up. Nav if so, toast otherwise
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

  // Try to sign up and log in
  onSignupPress = () => {
    const { createUserAndLogin } = this.props;
    const { email, password, username } = this.state;
    createUserAndLogin(email, password, username);
  };

  render() {
    const { email, password, username } = this.state;
    const { auth, navigation } = this.props;

    const signupText = auth.creatingUser ? 'Creating user...' : 'Sign up';

    return (
      <Container>
        <SimpleHeader title="Sign up" isBack navigation={navigation} />
        <Content>
          <View style={{ alignItems: 'center', padding: 30 }}>
            <Text style={stylesLogo.flareLogo}>Flare</Text>
          </View>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                value={username}
                onChangeText={text => this.setState({ username: text })}
              />
            </Item>
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
          <View style={stylesSignUp.ContSignUp}>
            <TouchableWithoutFeedback onPress={this.onSignupPress}>
              <View
                style={
                  auth.creatingUser
                    ? stylesSignUp.buttonDisabledSignUp
                    : stylesSignUp.buttonSignUp
                }
              >
                <Text style={stylesSignUp.buttonTextSignUp}>{signupText}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
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
