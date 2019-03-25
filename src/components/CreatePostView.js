import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

// Import the redux actions
import * as MakePostActions from '../actions/makePosts';

class CreatePostView extends Component {
  state = {
    postText: '',
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
          <Form>
            <Item>
              <Input
                placeholder="What's up?"
                value={postText}
                onChangeText={text => this.setState({ postText: text })}
              />
            </Item>
          </Form>
          <Button
            onPress={() => this.onPostBtnPress(currentGeo)}
            disabled={makePost.isPosting}
          >
            <Text>{postBtnText}</Text>
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
