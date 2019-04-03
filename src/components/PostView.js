import React, { Component } from 'react';
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
import SimpleHeader from './common/SimpleHeader';

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
            <Icon name="md-time" />
            <Text>{` ${comment.timestamp} `}</Text>
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
          <Card>
            <Text>{post.text}</Text>
          </Card>
          <Card>{comments.map(comment => this.renderComments(comment))}</Card>
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
