import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Container, Content, Text, Toast, View, Right } from 'native-base';
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
    borderColor: '#A9A9A9',
    color: '#e21d16',
    fontSize: 20,
  },
});

// render the make post form
class CreatePostView extends Component {
  state = {
    postText: '',
  };

  // check if we made a post. If so, nav back to post list
  componentDidUpdate = () => {
    const { makePost, ackPostSuccess } = this.props;
    if (makePost.postSuccess) {
      Toast.show({ text: 'Post success!', buttonText: 'Okay', duration: 2500 });
      ackPostSuccess();
      const { navigation } = this.props;
      navigation.navigate('PostList');
    }
  };

  // Try to make a post for the current geo
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
          <View style={stylesPost.containerTextBox}>
            <TextInput
              style={stylesPost.searchBar}
              placeholder=" What's up?"
              placeholderTextColor="black"
              value={postText}
              onChangeText={text =>
                this.setState({ postText: text.slice(0, 180) })
              }
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
