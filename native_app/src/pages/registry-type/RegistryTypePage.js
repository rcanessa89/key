// React.
import React from 'react';
import { View, ImageBackground } from 'react-native';
// Redux.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ACTIONS } from './reducer';
// Styles.
import { RegistryTypeStyles as styles } from '../../styles';
// Components.
import Button from '../../components/button';
import AppNavBar from '../../components/navigationBar';

const RegistryType = (props) => 
    <ImageBackground source={props.source} style={styles.bgImage} >
        <View style={[styles.registryType, props.curtainStyle]} >
            <Button style={styles.button} color='white' title={props.title} onPress={props.onPress} />
        </View>
    </ImageBackground>
;

class RegistryTypePage extends React.PureComponent {

    render () {
        const { navigate } = this.props.navigation;
        const searchImg    = require('../../images/search.png'),
              scanImg      = require('../../images/scan.png'),
              manualImg    = require('../../images/form.png');

        return (
            <View style={styles.pageContainer} >
                <AppNavBar navigation={this.props.navigation} />
                <View style={styles.registryTypeContainer}>
                    <RegistryType title="Scan ID"      onPress={navigate.bind(this, 'RegistryScan')} source={scanImg}   curtainStyle={styles.registryLightBlue} />
                    <RegistryType title="Search ID #"  onPress={navigate.bind(this, 'Registry')}     source={searchImg} curtainStyle={styles.registryDarkBlue}  />
                    <RegistryType title="Manual Entry" onPress={navigate.bind(this, 'Registry')}     source={manualImg} curtainStyle={styles.registryLightBlue} />
                </View>
            </View>
        );
    }
    
}

const stateMap    = state => ({ });
const dispatchMap = dispatch => ({ });

export default connect(stateMap, dispatchMap)(RegistryTypePage);