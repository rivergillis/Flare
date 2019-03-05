import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

// Import the redux actions
import * as AuthActions from '../actions/auth';

class SettingsPage extends Component {
  constructor(args) {
    super(args);
    const { auth } = this.props;
    this.state = { username: auth.userData.username };
  }

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
          <Button onPress={this.onSavePress} disabled={auth.savingUserData}>
            <Text>{saveText}</Text>
          </Button>
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
