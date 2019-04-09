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
    flexBasis: '25%',
  },
  cardIconsStyle: {
    flexDirection: 'row',
    flexBasis: '55%',
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
});

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGeo: null, // currentGeo.coords.latitude
      geoError: null,
      newButtonActive: true,
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

  componentDidUpdate() {
    const { navigation } = this.props;
    const postSuccess = navigation.getParam('postSuccess', null);
    if (postSuccess) {
      Toast.show({ text: 'Post success!', buttonText: 'Okay', duration: 2500 });
    }
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
      postDocId: post.docId,
    });
  };

  onRepostButtonPress = (post, canRepost, shouldIgnore) => {
    if (shouldIgnore) {
      console.log('ignoring repost request');
      Toast.show({
        text: "You can't repost that!",
        buttonText: 'Okay',
        duration: 2500,
      });
      return;
    }
    const { repostPost } = this.props;
    repostPost(post, canRepost);
  };

  onNewButtonPress = () => {
    const { newButtonActive } = this.state;
    if (newButtonActive) {
      return;
    }
    this.setState({ newButtonActive: true });
  };

  onHotButtonPress = () => {
    const { newButtonActive } = this.state;
    if (!newButtonActive) {
      return;
    }
    this.setState({ newButtonActive: false });
  };

  renderPost = post => {
    const { postComments, postReposts, userData } = this.props;
    const comments = postComments[post.docId];
    const numComments = comments ? comments.length : 0;

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

    return (
      <Card key={post.text + byText}>
        <CardItem button bordered onPress={() => this.onPostPress(post)}>
          <Body style={styles.cardBodyStyle}>
            <Text>{post.text}</Text>
            <Text style={styles.timePostedStyle}>
              Posted <TimeAgo time={post.createdOn.toDate()} />{' '}
              {post.ownerUsername && 'by'}{' '}
              <Text
                style={
                  byText === 'you' ? styles.bySelfStyle : styles.timePostedStyle
                }
              >
                {byText}
              </Text>
            </Text>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() =>
                this.onRepostButtonPress(post, canRepost, shouldIgnoreRepost)
              }
            >
              <View style={styles.cardIconsStyle}>
                <Icon
                  style={
                    canRepost
                      ? styles.regularRepostIconStyle
                      : styles.repostedRepostIconStyle
                  }
                  name="md-repeat"
                />
                <Text>{` ${post.numReposts}    `}</Text>
                <Icon name="md-chatboxes" />
                <Text>{` ${numComments}`}</Text>
              </View>
            </TouchableOpacity>
          </Right>
        </CardItem>
      </Card>
    );
  };

  resetFetchSubscription = (lat, lon) => {
    const {
      subscribeFetchPostList,
      loadingPostList,
      currentSubscription,
    } = this.props;
    if (loadingPostList) {
      return;
    }
    subscribeFetchPostList(lat, lon, currentSubscription);
  };

  render() {
    const { posts, navigation, initialLoad } = this.props;
    const { geoError, currentGeo, newButtonActive } = this.state;

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
            active={newButtonActive}
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
            active={!newButtonActive}
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
          <View style={{ paddingTop: '20%' }} />
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
