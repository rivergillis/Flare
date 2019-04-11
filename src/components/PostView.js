import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  Button,
  Container,
  Content,
  Text,
  CardItem,
  Card,
  Icon,
  View,
  Right,
} from 'native-base';
import TimeAgo from 'react-native-timeago';
// import TimeAgo from 'react-native-timeago'; // may want to continue the time ago
import SimpleHeader from './common/SimpleHeader';

const styles = StyleSheet.create({
  cardIconsStyle: {
    flexDirection: 'row',
    flexBasis: '35%',
  },
  timePostedStyle: {
    color: '#5e5e5e',
    fontStyle: 'italic',
  },
  postStyle: {
    height:100,
  },
  commentsStyle: {
    flexBasis: '55%',
  }
});

class PostView extends Component {
  onMakeCommentBtnPress = postDocId => {
    const { navigation } = this.props;
    navigation.navigate('CreateCommentView', { postDocId });
  };

  renderComments = comment => {
    return (
      <CardItem key={comment.docId} bordered>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
          }}
        >
          <View>
            <Text>{comment.text}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
          <Text>
              <Icon 
                type="FontAwesome"
                name="clock-o"
                style={{ fontSize: 17}}/> {' '}
              <TimeAgo time={comment.TimeAgo} /> {' '}
          </Text>
          <Text>
              <Icon 
                type="FontAwesome"
                name="user-circle"
                style={{ fontSize: 17}}
              /> {' '}
          </Text>
          <Text>
              <Icon
                type="FontAwesome"
                name="globe"
                style={{ fontSize: 17 }}
              />
          </Text>
          </View>
        </View>
      </CardItem>
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
          <Card style={styles.postStyle}>
            <Text>{post.text}</Text>
          </Card>
          <Card style={styles.commentsStyle}>
            {comments.map(comment => this.renderComments(comment))}
          </Card>
          <Button onPress={() => this.onMakeCommentBtnPress(postDocId)}>
            <Text>Make Comment</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

// connect everything and export the component
export default PostView;
