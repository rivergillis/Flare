import React, { Component } from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
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
  testCont2: {
    paddingTop: 275,
    alignItems: 'center',
  },
  buttonTest2: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#e21d16',
  },
  buttonTextTest2: {
    padding: 20,
    color: 'white',
  },
  // buttonDisabled2: {
  //   marginBottom: 30,
  //   width: 260,
  //   alignItems: 'center',
  //   backgroundColor: '#a0a0a0',
  // },
});

class SignupPage extends Component {
  state = {
    email: '',
    password: '',
    username: '',
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
          <View style = {{alignItems:'center', padding: 30}}>
            <Text style = {stylesLogo.flareLogo}>Flare</Text>
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
          {/* <Button onPress={this.onSignupPress} disabled={auth.creatingUser}>
            <Text>{signupText}</Text>
          </Button> */}
          <View style = {stylesSignUp.testCont2}>
          <TouchableWithoutFeedback
            onPress={this.onSignupPress}
            // disabled={auth.creatingUser}>
            
            >
            <View style = {stylesSignUp.buttonTest2}>
            {/* <View
              style={
                auth.creatingUser
                  ? stylesSignUp.buttonDisabled2
                  : stylesSignUp.buttonTest2
              }
            > */}
            {/* <Text style = {stylesSignUp.buttontextTest2}>{signupText}</Text> */}
            <Text style = {stylesSignUp.buttontextTest2}>Sign up</Text>
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
