import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Icon,
  Right,
  Body,
  View,
  Fab,
  Toast,
  Spinner,
  Segment,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import SimpleHeader from './common/SimpleHeader';
// Import the redux actions
import * as PostListActions from '../actions/postList';

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
  bySelfStyle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  regularRepostIconStyle: {
    color: 'black',
  },
  repostedRepostIconStyle: {
    color: '#e21d16',
  },
  locationPosition: {
    paddingTop: '20%',
  },
});

// The Flare Feed, render all nearby posts and update the geolocation and posts.
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGeo: null, // currentGeo.coords.latitude
      geoError: null,
    };
  }

  // Called as soon as the component is mounted.
  componentDidMount() {
    const { setFetchPostInitialLoad } = this.props;
    const { lastPostFetch } = this.state;

    setFetchPostInitialLoad(true);

    // Set up a geolocation watcher that updates the post list whenever we get new coordinates
    // TODO: Use a timer to do this manually every x seconds ?
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({ currentGeo: position, geoError: null });
        console.log(
          `Location updated to (${position.coords.latitude}, ${
            position.coords.longitude
          } after waiting ${(position.timestamp - lastPostFetch) / 1000}s)`
        );

        this.setState({ lastPostFetch: new Date().getTime() });
        this.resetFetchSubscription(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      error => this.setState({ geoError: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
        distanceFilter: 10, // 10 meters
        frequency: 30, // TODO this doesn't actually do anything
      }
    );
  }

  // Nav to make post screen
  onMakePostButtonPress = () => {
    const { navigation } = this.props;
    const { currentGeo } = this.state;
    navigation.navigate('CreatePostView', { currentGeo });
  };

  // Nav to post view
  onPostPress = post => {
    const { navigation, postComments } = this.props;
    navigation.navigate('PostView', {
      post,
      comments: postComments[post.docId],
      postDocId: post.docId,
    });
  };

  // Try to repost or unrepost
  onRepostButtonPress = (post, canRepost, shouldIgnore) => {
    if (shouldIgnore) {
      console.log('ignoring repost request');
      Toast.show({
        text: "That's your own post!",
        buttonText: 'Okay',
        duration: 2500,
      });
      return;
    }
    const { repostPost } = this.props;
    repostPost(post, canRepost);
  };

  // Change sorting to new
  onNewButtonPress = () => {
    const { sortMethod, setSortMethod } = this.props;
    if (sortMethod === 'new') {
      return;
    }
    setSortMethod('new');
  };

  // Change sorting to hot
  onHotButtonPress = () => {
    const { sortMethod, setSortMethod } = this.props;
    if (sortMethod === 'hot') {
      return;
    }
    setSortMethod('hot');
  };

  // Render a post as a card
  renderPost = post => {
    const { postComments, postReposts, userData } = this.props;
    const comments = postComments[post.docId];
    const numComments = comments ? comments.length : 0;
    const commentsText = `${numComments} comments`;

    // const byText = post.ownerUsername ? `${post.ownerUsername}` : '';
    const byText =
      post.ownerId === userData.userId ? 'you' : post.ownerUsername;

    // Todo: check if the userId is in the 'reposted' collection for the post
    // const canRepost = postReposts[post.docId].userHasReposted;
    let canRepost = true;
    const repostDoc = postReposts[post.docId];
    if (repostDoc && repostDoc.userHasReposted) {
      canRepost = false;
    }

    const shouldIgnoreRepost = userData.userId === post.ownerId || !repostDoc;

    const roundedDist = Math.round(post.distance);
    const distText =
      roundedDist < 10 ? 'right here' : `${roundedDist} meters away`;

    return (
      <Card
        style={{ marginLeft: 10, marginRight: 10 }}
        key={post.text + byText}
      >
        <CardItem button bordered onPress={() => this.onPostPress(post)}>
          <Body style={styles.cardBodyStyle}>
            <Text style={{ fontSize: 17 }}>{post.text}</Text>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() =>
                this.onRepostButtonPress(post, canRepost, shouldIgnoreRepost)
              }
            >
              <View style={styles.cardIconsStyle}>
                <Text>
                  <Icon
                    style={
                      canRepost
                        ? styles.regularRepostIconStyle
                        : styles.repostedRepostIconStyle
                    }
                    name="md-repeat"
                  />
                  {` ${post.numReposts}`}
                </Text>
              </View>
            </TouchableOpacity>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            {/* Render the username */}
            <Text>
              <Icon
                type="FontAwesome"
                name="user-circle"
                style={{ fontSize: 14 }}
              />{' '}
              {post.ownerUsername}{' '}
            </Text>
            {/* Render how old it is */}
            <Text>
              <Icon
                type="FontAwesome"
                name="clock-o"
                style={{ fontSize: 15 }}
              />{' '}
              <TimeAgo time={post.createdOn.toDate()} />{' '}
            </Text>
            {/* Render the distance */}
            <Text>
              <Icon type="FontAwesome" name="globe" style={{ fontSize: 15 }} />{' '}
              {distText}
            </Text>
            {/* Render comments if any */}
            {numComments > 0 && (
              <Text>
                <Icon name="md-chatboxes" style={{ fontSize: 15 }} />{' '}
                {commentsText}
              </Text>
            )}
          </Body>
        </CardItem>
      </Card>
    );
  };

  // Change post query sub on location change
  resetFetchSubscription = (lat, lon) => {
    const {
      subscribeFetchPostList,
      loadingPostList,
      currentSubscription,
      sortMethod,
    } = this.props;
    if (loadingPostList) {
      return;
    }
    subscribeFetchPostList(lat, lon, currentSubscription, sortMethod);
  };

  render() {
    const { posts, navigation, initialLoad, sortMethod } = this.props;
    const { geoError, currentGeo } = this.state;

    if (geoError && initialLoad) {
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
                this.resetFetchSubscription(37.785834, -122.406417);
                this.setState({ geoError: null });
              }}
            >
              <Text>Debug: fetch posts</Text>
            </Button>
          </Content>
        </Container>
      );
    }

    if (initialLoad) {
      return (
        <Container>
          <SimpleHeader
            title="Flare Feed"
            icon="ios-settings"
            onPress={() => navigation.navigate('Settings')}
          />
          <Content>
            <Text
              style={{
                paddingTop: '10%',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Finding posts near you...
            </Text>
            <Spinner color="#e21d16" />
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
          hasSegment
        />
        <Segment>
          <Button
            first
            active={sortMethod === 'new'}
            onPress={this.onNewButtonPress}
          >
            <Text>new</Text>
            <Icon
              style={{ marginLeft: '0%' }}
              type="MaterialCommunityIcons"
              name="newspaper"
            />
          </Button>
          <Button
            last
            active={sortMethod === 'hot'}
            onPress={this.onHotButtonPress}
          >
            <Text>hot</Text>
            <Icon
              style={{ marginLeft: '0%' }}
              type="MaterialCommunityIcons"
              name="fire"
            />
          </Button>
        </Segment>
        <Content>
          {posts.map(post => this.renderPost(post))}
          {currentGeo && currentGeo.coords && (
            <Text style={{ textAlign: 'center', paddingTop: '10%' }}>
              [debug] you are at ({currentGeo.coords.latitude},{' '}
              {currentGeo.coords.longitude})
            </Text>
          )}
          <View style={styles.locationPosition} />
        </Content>
        <View>
          <Fab
            position="bottomRight"
            containerStyle={{}}
            style={{ backgroundColor: '#e21d16' }}
            onPress={this.onMakePostButtonPress}
          >
            <Icon name="md-create" />
          </Fab>
        </View>
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
    currentSubscription: state.PostListReducer.currentSubscription,
    loadingPostList: state.PostListReducer.loadingPostList,
    postComments: state.PostListReducer.postComments,
    postReposts: state.PostListReducer.postReposts,
    initialLoad: state.PostListReducer.initialLoad,
    sortMethod: state.PostListReducer.sortMethod,
    makePost: state.MakePostReducer,
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
