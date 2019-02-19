import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginPage from './components/LoginPage';
import CreatePostView from './components/CreatePostView';
import PostList from './components/PostList';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginPage,
    },
    PostList: {
      screen: PostList,
    },
    CreatePostView: {
      screen: CreatePostView,
    },
  },
  // This will hide the automatically-added header so that we can use our own
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default createAppContainer(AppNavigator);
