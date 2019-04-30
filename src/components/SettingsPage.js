import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  View,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

// Import the redux actions
import * as AuthActions from '../actions/auth';

const stylesSettings = StyleSheet.create({
  ContSettingButton: {
    paddingTop: 520,
    alignItems: 'center',
  },
  buttonSetting: {
    marginBottom: 30,
    width: 330,
    alignItems: 'center',
    backgroundColor: '#e21d16',
  },
  buttonTextSetting: {
    padding: 20,
    color: 'white',
  },
  buttonDisabledSetting: {
    marginBottom: 30,
    width: 330,
    alignItems: 'center',
    backgroundColor: '#a0a0a0',
  },
});

// Render the settings page, allows the user to change their username currently
class SettingsPage extends Component {
  constructor(args) {
    super(args);
    const { auth } = this.props;
    this.state = { username: auth.userData.username };
  }

  // Update the username
  onSavePress = () => {
    const { saveUserData, auth } = this.props;
    const { username } = this.state;
    saveUserData(auth.userData, { username });
  };

  render() {
    const { navigation, auth } = this.props;
    const { username } = this.state;

    const saveText = auth.savingUserData ? 'Saving...' : 'Save';

    return (
      <Container>
        <SimpleHeader title="Settings" isBack navigation={navigation} />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                value={username}
                onChangeText={text => this.setState({ username: text })}
              />
            </Item>
          </Form>
          {/* <Button onPress={this.onSavePress} disabled={auth.savingUserData}>
            <Text>{saveText}</Text>
          </Button> */}

          <View style={stylesSettings.ContSettingButton}>
            <TouchableWithoutFeedback
              onPress={this.onSavePress}
              disabled={auth.savingUserData}
            >
              <View
                style={
                  auth.savingUserData
                    ? stylesSettings.buttonDisabledSetting
                    : stylesSettings.buttonSetting
                }
              >
                <Text style={stylesSettings.buttonTextSetting}>{saveText}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Content>
      </Container>
    );
  }
}

// This functions tells redux to give this component the specified parts of the app state
// that are governed by the reducers.
// The returned object becomes part of the component's "this.props"
function mapStateToProps(state) {
  return {
    auth: state.AuthReducer,
  };
}

// This functions tells redux to give this component access the the actions
// that we imported at the top of the file.
// The actions become part of the component's "this.props" as functions.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

// connect everything and export the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
