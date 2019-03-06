import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Icon,
  Right,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

// Import the redux actions
import * as PostListActions from '../actions/postList';

// TODO: Use geofirestore to fetch posts https://geofirestore.com

class PostList extends Component {
  state = {
    currentGeo: null, // currentGeo.coords.latitude
    geoError: null,
    lastPostFetch: 0,
  };

  // Called as soon as the component is mounted.
  componentDidMount() {
    const { lastPostFetch } = this.state;

    // Set up a geolocation watcher that updates the post list whenever we get new coordinates
    // Only fetches new posts every 10 seconds
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({ currentGeo: position, geoError: null });

        // TODO: This is broken, fix it.
        if (position.timestamp - lastPostFetch > 10000) {
          console.log(
            `Location updated to (${position.coords.latitude}, ${
              position.coords.longitude
            })`
          );

          this.setState({ lastPostFetch: new Date().getTime() });
          this.updatePosts(position.coords.latitude, position.coords.longitude);
        }
      },
      error => this.setState({ geoError: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );
  }

  onMakePostButtonPress = () => {
    const { navigation } = this.props;
    const { currentGeo } = this.state;
    navigation.navigate('CreatePostView', { currentGeo });
  };

  onPostPress = post => {
    const { navigation, postComments } = this.props;
    navigation.navigate('PostView', {
      post,
      comments: postComments[post.docId],
    });
  };

  // TODO: Use a better key
  // TODO: Fix these styles
  renderPost = post => {
    const { postComments } = this.props;
    const comments = postComments[post.docId];
    const numComments = comments ? comments.length : 0;
    return (
      <CardItem
        key={post.text}
        button
        bordered
        onPress={() => this.onPostPress(post)}
      >
        <Text>{post.text}</Text>
        <Right>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="md-repeat" />
            <Text>{` ${post.reposts}    `}</Text>
            <Icon name="md-chatboxes" />
            <Text>{` ${numComments}`}</Text>
          </View>
        </Right>
      </CardItem>
    );
  };

  updatePosts = (lat, lon) => {
    const { fetchPostList } = this.props;
    fetchPostList(lat, lon);
  };

  render() {
    const { posts, navigation } = this.props;
    const { geoError } = this.state;

    if (geoError) {
      return (
        <Container>
          <SimpleHeader
            title="Flare Feed"
            icon="ios-settings"
            onPress={() => navigation.navigate('Settings')}
          />
          <Content>
            <Text>Error getting location, make sure location data is on.</Text>
            <Button
              onPress={() => {
                this.updatePosts(37.785834, 122.406417);
                this.setState({ geoError: null });
              }}
            >
              <Text>Debug: fetch posts</Text>
            </Button>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <SimpleHeader
          title="Flare Feed"
          icon="ios-settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <Content>
          <Card>{posts.map(post => this.renderPost(post))}</Card>
          <Button onPress={this.onMakePostButtonPress}>
            <Text>Make Post</Text>
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
    userData: state.AuthReducer.userData,
    posts: state.PostListReducer.posts,
    loadingPostList: state.PostListReducer.loadingPostList,
    postComments: state.PostListReducer.postComments,
  };
}

// This functions tells redux to give this component access the the actions
// that we imported at the top of the file.
// The actions become part of the component's "this.props" as functions.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostListActions, dispatch);
}

// connect everything and export the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
