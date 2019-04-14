import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import TimeAgo from 'react-native-timeago';
import {
  Button,
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
  cardIconsStyle: {
    flexDirection: 'row',
    flexBasis: '0%',
  },
  timePostedStyle: {
    color: '#5e5e5e',
    fontStyle: 'italic',
  },
  postStyle: {
    height:100,
  },
  commentsStyle: {
    flexBasis: '0%',
  }
});

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

  componentDidUpdate() {
    const { navigation } = this.props;
    const commentSuccess = navigation.getParam('commentSuccess', null);
    if (commentSuccess) {
      Toast.show({text: "Comment Success!", buttonText: 'Ok', duration: 2500});
    }
  }

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


  renderComments = comment => {
    const byText = comment.ownerUsername ? `by ${comment.ownerUsername}` : '';

    return (
      <Card key={comment.text + byText} bordered>
          <CardItem header bordered>
          <Text>{comment.text}</Text>
          </CardItem>
          <Body>
          <View style={{ flexDirection: 'column' }}>
          <Text>
              <Icon 
                type="FontAwesome"
                name="user-circle"
                style={{ fontSize: 17}}
              /> {' '}
              <Text>{comment.ownerUsername}</Text>
          </Text>
          <Text>
              <Icon 
                type="FontAwesome"
                name="clock-o"
                style={{ fontSize: 17}}
              /> {' '}
              <TimeAgo style={styles.timePostedStyle} time={comment.createdOn.toDate()} /> {' '}
          </Text>
          </View>
          </Body>
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
        <Card transparent>
          <CardItem header style={styles.cardHeaderStyle}>
            <Text style={styles.usernameStyle}>
              {post.text}
            </Text>
          </CardItem>
          <Body style={styles.cardBodyStyle}>
            <Text>{` ${post.ownerUsername} `}</Text>
            <Text style={styles.timePostedStyle}>
              Posted <TimeAgo time={post.createdOn.toDate()} />
            </Text>
          </Body>
      </Card>
          {comments.map(comment => this.renderComments(comment))}
        </Content>
        <View>
          <Fab
            position="bottomRight"
            containerStyle={{}}
            style={{ backgroundColor: '#e21d16' }}
            onPress={() => 
              this.onMakeCommentBtnPress(postDocId)}
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