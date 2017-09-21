// React.
import React from 'react';
import { Text, TextInput, View, Image, Keyboard } from 'react-native';
// Dev.
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { NavigationActions } from 'react-navigation'
// Styles.
import { RegistryStyles as styles } from '../../styles';
// Components.
import DocumentSearch from '../../components/documentSearch';
import DocumentScan from '../../components/documentScan';
import Button from '../../components/button';
import BackgroundImage from '../../components/backgroundImage';
import AppNavBar from '../../components/navigationBar';

class RegistryPage extends React.PureComponent {

    render() {
        const backgroundImage = {
            src     : require('../../images/macbook.png'),
            curtain : 'rgba(49, 98, 205, 0.95)'
        };
        
        const { navigate } = this.props.navigation;

        const goToSignature = navigate.bind(this, 'Signature');

        return (
            <View style={styles.pageContainer}>
                <AppNavBar navigation={this.props.navigation} />
                <DocumentScan onPersonalInformationGathered={goToSignature} />
            </View>
        );
    }
}

export default RegistryPage;