import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

// Pages
import RegistryPage from './pages/registry/RegistryPage';

export const AppNavigator = StackNavigator({
    Registry: { screen: RegistryPage }
});

const AppWithNavigationState = ({ dispatch, nav }) => <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);