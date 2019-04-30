import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import TimeAgo from 'react-native-timeago';
import {
  Container,
  Content,
  Text,
  CardItem,
  Card,
  Icon,
  View,
  Body,
  Toast,
  Fab,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';
import * as PostViewActions from '../actions/postView';

const styles = StyleSheet.create({
  cardBodyStyle: {
    flexBasis: '55%',
  },
  cardIconsStyle: {
    flexDirection: 'row',
    flexBasis: '35%',
  },
  timePostedStyle: {
    color: '#5e5e5e',
    fontStyle: 'italic',
  },
  postStyle: {
    height: 125,
  },
  ogPostFont: {
    fontSize: 17,
    fontStyle: 'normal',
  },
});

// The post view, render the post and comments
class PostView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const { navigation } = this.props;
    // const post = navigation.getParam('post', null);
    // const comments = navigation.getParam('comments', null);
    // const postDocId = post.docId;
    // this.setState({post: post});
    // this.setState({comments: comments});
    // this.setState({postDocId: postDocId});
    // this.resetFetchSubscription();
  }

  // Check if commented and toast if so
  componentDidUpdate() {
    const { navigation } = this.props;
    const commentSuccess = navigation.getParam('commentSuccess', null);
    if (commentSuccess) {
      Toast.show({
        text: 'Comment Success!',
        buttonText: 'Ok',
        duration: 2500,
      });
    }
  }

  // Make a comment
  onMakeCommentBtnPress = postDocId => {
    const { navigation } = this.props;
    navigation.navigate('CreateCommentView', { postDocId });
  };

  resetFetchSubscription = () => {
    const {
      subscribeFetchComments,
      currentSubscription,
      postDocId,
    } = this.props;
    subscribeFetchComments(currentSubscription, postDocId);
  };

  // Render a comment card
  renderComments = comment => {
    return (
      <Card
        style={{ marginLeft: 10, marginRight: 10 }}
        key={comment.docId}
        bordered
      >
        <CardItem header bordered>
          <Text style={{ fontSize: 17 }}>{comment.text}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Icon
                type="FontAwesome"
                name="user-circle"
                style={{ fontSize: 14 }}
              />{' '}
              <Text>{comment.ownerUsername}</Text>{' '}
            </Text>
            <Text>
              <Icon
                type="FontAwesome"
                name="clock-o"
                style={{ fontSize: 15 }}
              />{' '}
              Posted{' '}
              <TimeAgo
                style={styles.timePostedStyle}
                time={comment.createdOn.toDate()}
              />{' '}
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  };

  render() {
    const { navigation } = this.props;
    const post = navigation.getParam('post', null);
    const comments = navigation.getParam('comments', null);
    const postDocId = post.docId;

    return (
      <Container>
        <SimpleHeader title="Flare Post" isBack navigation={navigation} />
        <Content>
          <Card>
            <CardItem header style={styles.cardHeaderStyle}>
              <Text style={styles.ogPostFont}>{post.text}</Text>
            </CardItem>
          </Card>
          {comments.map(comment => this.renderComments(comment))}
        </Content>
        <View>
          <Fab
            position="bottomRight"
            containerStyle={{}}
            style={{ backgroundColor: '#e21d16' }}
            onPress={() => this.onMakeCommentBtnPress(postDocId)}
          >
            <Icon name="md-create" />
          </Fab>
        </View>
      </Container>
    );
  }
}

//export default PostView;

function mapStateToProps(state) {
  return {
    userData: state.AuthReducer.userData,
    // post: state.PostViewReducer.post,
    // currentSubscription: state.PostViewReducer.currentSubscription,
    // comments: state.PostViewReducer.postComments,
    //postReposts: state.PostViewReducer.postReposts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostViewActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView);
