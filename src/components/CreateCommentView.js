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

import * as MakeCommentActions from '../actions/makeComments';

class CreateCommentView extends Component {
  state = {
    commentText: '',
  };

  componentDidUpdate = () => {
    const { makeComment, ackCommentSuccess } = this.props;
    if (makeComment.commentSuccess) {
      ackCommentSuccess();
      const { navigation } = this.props;
      navigation.navigate('PostView', { commentSuccess: true });
    }
  };

  onCommentBtnPress = postDocId => {
    const { commentText } = this.state;
    const { createComment, userData } = this.props;
    console.log(postDocId);

    createComment(commentText, userData.username, postDocId);
    this.setState({ commentText: '' });
  };

  render() {
    const { navigation, makeComment } = this.props;
    const { commentText } = this.state;

    const postDocId = navigation.getParam('postDocId', null);

    const commentBtnText = makeComment.isCommenting
      ? 'Commenting...'
      : 'Comment';

    return (
      <Container>
        <SimpleHeader title="Create Comment" isBack navigation={navigation} />
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Share your thoughts!"
                value={commentText}
                onChangeText={text => this.setState({ commentText: text })}
                disabled={makeComment.isCommenting}
              />
            </Item>
          </Form>
          <Button
            onPress={() => this.onCommentBtnPress(postDocId)}
            disabled={makeComment.isCommenting}
          >
            <Text>{commentBtnText}</Text>
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
    makeComment: state.MakeCommentsReducer,
    userData: state.AuthReducer.userData,
  };
}

// This functions tells redux to give this component access the the actions
// that we imported at the top of the file.
// The actions become part of the component's "this.props" as functions.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(MakeCommentActions, dispatch);
}

// connect everything and export the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCommentView);
