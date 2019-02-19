import { createStackNavigator, createAppContainer } from 'react-navigation';
import PostList from './components/PostList';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: PostList,
    },
  },
  // This will hide the automatically-added header so that we can use our own
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default createAppContainer(AppNavigator);
