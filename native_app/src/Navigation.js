import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

// Pages
import RegistryPage      from './pages/registry/RegistryPage';
import RegistryScan      from './pages/registry-scan/RegistryScan';
import RegistryTypePage  from './pages/registry-type/RegistryTypePage';
import HomePage          from './pages/home/HomePage';
import Confirm           from './pages/home/HomePage';
import SignatureRegistry from './pages/signature-registry/SignatureRegistry';

export const AppNavigator = StackNavigator(
  {
      Home         : { screen : HomePage },
      Registry     : { screen : RegistryPage },
      RegistryScan : { screen : RegistryScan },
      RegistryType : { screen : RegistryTypePage },
      Signature    : { screen : SignatureRegistry },
      Confirm      : { screen : Confirm },
  }, 
  {
      headerMode: 'none'
  }
);

export default AppNavigator;