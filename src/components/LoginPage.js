import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   buttonContainer: {
//     margin: 20,
//   },
//   alternativeLayoutButtonContainer: {
//     margin: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });
class LoginPage extends Component {
  state = {
    email: 'test@test.com',
    password: 'password',
  };

  componentDidUpdate = () => {
    const { auth, ackLoginFail } = this.props;
    if (auth.user) {
      const { navigation } = this.props;
      navigation.navigate('PostList');
    } else if (auth.failedLogin) {
      Toast.show({ text: 'Login failed!', buttonText: 'Okay' });
      ackLoginFail();
    }
  };

  // Just log in for now
  onLoginPress = () => {
    const { loginUser } = this.props;
    const { email, password } = this.state;
    loginUser(email, password);
  };

  onSignupPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Signup');
  };

  render() {
    const { email, password } = this.state;
    const { auth } = this.props;

    const loginText = auth.loggingIn
      ? 'Logging in...'
      : '                     Log in';

    return (
      <Container>
        <SimpleHeader title="Flare - Login" />
        <Content>
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text>Flare</Text>
          </View>
          <Form>
            <Item floatingLabel>
              <Label>Email or Username</Label>
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
          <Button
            onPress={this.onLoginPress}
            disabled={auth.loggingIn}
            style={{
              backgroundColor: '#e21d16',
              width: 260,
              marginHorizontal: 50,
            }}
          >
            <Text>{loginText}</Text>
          </Button>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 275,
            }}
          >
            <Text>Not a member?</Text>
          </View>

          <Button
            //bordered
            onPress={this.onSignupPress}
            disabled={auth.loggingIn}
            style={{
              backgroundColor: '#e21d16',
              width: 260,
              marginHorizontal: 50,
            }}
          >
            <Text> Sign up</Text>
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
