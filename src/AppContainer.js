import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CreatePostView from './components/CreatePostView';
import CreateCommentView from './components/CreateCommentView';
import PostList from './components/PostList';
import PostView from './components/PostView';
import SettingsPage from './components/SettingsPage';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginPage,
    },
    Signup: {
      screen: SignupPage,
    },
    PostList: {
      screen: PostList,
    },
    PostView: {
      screen: PostView,
    },
    CreatePostView: {
      screen: CreatePostView,
    },
    CreateCommentView: {
      screen: CreateCommentView,
    },
    Settings: {
      screen: SettingsPage,
    },
  },
  // This will hide the automatically-added header so that we can use our own
  {
    initialRouteName: 'Login', // which screen the app starts out on
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default createAppContainer(AppNavigator);
