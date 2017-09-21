// React.
import React from 'react';
import { View, AppRegistry, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
// Dev.
import RegistryPage from './src/pages/registry/RegistryPage';
import HomePage from './src/pages/home/HomePage';
import SignatureRegistry from './src/pages/signature-registry/SignatureRegistry';

const NativeApp = StackNavigator({
  Home      : { screen : HomePage },
  Registry  : { screen : RegistryPage },
  Signature : { screen : SignatureRegistry },
},
{
  headerMode: 'none',
});

AppRegistry.registerComponent('native_app', () => NativeApp);