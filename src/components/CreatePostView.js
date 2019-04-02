import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput} from 'react-native';
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
  Right,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

// Import the redux actions
import * as MakePostActions from '../actions/makePosts';

const stylesPost = StyleSheet.create({
  ContPostButton: {
    paddingTop: 230,
    alignItems: 'center',
    
  },
  buttonPost: {
    marginBottom: 30,
    width: 330,
    alignItems: 'center',
    backgroundColor: '#e21d16',
  },
  buttonTextPost: {
    padding: 20,
    color: 'white',
  },
  buttonDisabledPost: {
    marginBottom: 30,
    width: 330,
    alignItems: 'center',
    backgroundColor: '#a0a0a0',
  },
  containerTextBox: {
    paddingTop: 10,
    alignItems: 'center',
  },
  searchBar: {
    borderWidth: 1,
    width: 330,
    height: 300,
    backgroundColor: '#D3D3D3',
    borderColor: '#A9A9A9',
    color: '#e21d16',
    fontSize: 20,
  }
});

class CreatePostView extends Component {
  state = {
    postText: '',
  };

  componentDidUpdate = () => {
    const { makePost, ackPostSuccess } = this.props;
    if (makePost.postSuccess) {
      ackPostSuccess();
      const { navigation } = this.props;
      navigation.navigate('PostList', { postSuccess: true });
    }
  };

  onPostBtnPress = geo => {
    const { postText } = this.state;
    const { createPost, userData } = this.props;
    console.log(geo);

    createPost(
      postText,
      geo.coords.latitude,
      geo.coords.longitude,
      userData.username
    );
    this.setState({ postText: '' });
  };

  render() {
    const { navigation, makePost } = this.props;
    const { postText } = this.state;

    const currentGeo = navigation.getParam('currentGeo', null);

    const postBtnText = makePost.isPosting ? 'Posting...' : 'Post';

    return (
      <Container>
        <SimpleHeader title="Create Post" isBack navigation={navigation} />
        <Content>
          <View style = {stylesPost.containerTextBox}>
            <TextInput
              style={stylesPost.searchBar}
              placeholder="What's up?"
              placeholderTextColor= "red"
              value={postText}
              onChangeText={text => this.setState({ postText: text })}
              disabled={makePost.isPosting}
              multiline={true}
            />
          </View>

          {/* TODO: Fix this style and enforce it */}
          <Right>
            <Text>{`${180 - postText.length} characters remaining`}</Text>
          </Right>
          <View style={stylesPost.ContPostButton}>
            <TouchableWithoutFeedback
              onPress={() => this.onPostBtnPress(currentGeo)}
              disabled={makePost.isPosting}
            >
              <View
                style={
                  makePost.isPosting
                    ? stylesPost.buttonDisabledPost
                    : stylesPost.buttonPost
                }
              >
                <Text style={stylesPost.buttonTextPost}>{postBtnText}</Text>
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
    makePost: state.MakePostReducer,
    userData: state.AuthReducer.userData,
  };
}

// This functions tells redux to give this component access the the actions
// that we imported at the top of the file.
// The actions become part of the component's "this.props" as functions.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(MakePostActions, dispatch);
}

// connect everything and export the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostView);
