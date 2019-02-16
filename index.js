/** @format */

import { AppRegistry } from 'react-native';
import firebase from 'firebase';
import App from './src/App';
// import PostList from './src/components/PostList';
import { name as appName } from './app.json';

// Initialize Firebase
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyDe79BqyZ-BxPz0voztpqhuhkvwpVfvStk',
    authDomain: 'flare-1e9ea.firebaseapp.com',
    databaseURL: 'https://flare-1e9ea.firebaseio.com',
    projectId: 'flare-1e9ea',
    storageBucket: 'flare-1e9ea.appspot.com',
    messagingSenderId: '215732801416',
  };
  firebase.initializeApp(config);
}

AppRegistry.registerComponent(appName, () => App);
