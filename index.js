/** @format */

import { AppRegistry } from 'react-native';
import App from './src/App';
import PostList from './src/components/PostList';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => PostList);
