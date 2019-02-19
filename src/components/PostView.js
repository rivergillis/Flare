import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

// Import the redux actions
import * as PostListActions from '../actions/postList';

class PostView extends Component {
  componentDidMount() {}
  render() {
    // const { navigation } = this.props;
    const { text } = this.props.navigation.state.params;
    return (
      <Container>
      <SimpleHeader title="Flare Post" />
        <Content>
          <Text>activePost: {text} </Text>
        </Content>
    </Container>    
    );}
}

function mapStateToProps(state) {
  return {
    posts: state.PostViewReducer.posts,
    loadingPostList: state.PostViewReducer.loadingPostList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostListActions, dispatch);
}

// connect everything and export the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView);