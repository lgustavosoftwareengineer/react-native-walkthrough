/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {WalkthroughProvider} from 'walkthrough';
import App from './App';
import {name as appName} from './app.json';

function MainEntry() {
  return (
    <WalkthroughProvider>
      <App />
    </WalkthroughProvider>
  );
}

AppRegistry.registerComponent(appName, () => MainEntry);
