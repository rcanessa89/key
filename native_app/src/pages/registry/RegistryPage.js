import React from 'react';
import { Platform, requireNativeComponent, StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Camera from 'react-native-camera';
import * as actionCreators from './action-creators';
import { colors, sizes } from '../../constants';

const IOSCamera     = (Platform.OS === 'ios') ? requireNativeComponent('RNTMap', null) : null,
      AndroidCamera = (Platform.OS === 'android') ? Camera : null;

const styles = StyleSheet.create({
    registryPage: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    question: {
        color: colors.white,
        marginBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 28,
        textAlign: 'center'
    },

    main: {
        width: '90%',
    },

    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonContainer: {
        backgroundColor: colors.info,
        width: '40%'
    },

    camera: {
        width: '100%',
        height: '100%'
    },

    map: {
        width: '100%',
        height: '100%'
    },

});

class RegistryPage extends React.PureComponent {
    constructor() {
        super();
        this.openScanner = this.openScanner.bind(this);
        this.onReadCode = this.onReadCode.bind(this);
    }

    openScanner() {
        this.props.dispatch.showCamera(true);
    }

    onReadCode(code) {
        console.log('Got it!');
        console.log(code);
    }

    render() {
        const CodeReader = Platform.select({
            ios     : () => requireNativeComponent('RNTMap', null),
            android : () => <AndroidCamera 
                                ref={ cam => this.camera = cam }
                                captureAudio={false}
                                onBarCodeRead={this.onReadCode}
                                barcodeTypes={[Camera.constants.BarCodeType.pdf417]} 
                            />,
        })();

        return (
            <View style={styles.registryPage}>
                 <CodeReader style={styles.camera} />
            </View>
        );
    }
}

const stateMap = state => ({
    showCamera: state.registry.showCamera
});

const dispatchMap = dispatch => ({
    dispatch: bindActionCreators(actionCreators, dispatch)
});

export default connect(stateMap, dispatchMap)(RegistryPage);
