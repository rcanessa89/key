import React from 'react';
import { requireNativeComponent, StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Camera from 'react-native-camera';
import * as actionCreators from './action-creators';
import { colors, sizes } from '../../constants';


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
        flex: 1,
        width: '100%',
        height: '100%'
    },

    map: {
        width: '100%',
        height: '100%'
    },

});

const stateMap = state => ({
    showCamera: state.registry.showCamera
});

const dispatchMap = dispatch => ({
    dispatch: bindActionCreators(actionCreators, dispatch)
});

const MapComponent = requireNativeComponent('RNTMap', null);

class RegistryPage extends React.PureComponent {
    constructor() {
        super();
        this.openScanner = this.openScanner.bind(this);
        this.onReadCode = this.onReadCode.bind(this);
        this.hello = 'Hello world';
    }

    openScanner() {
        this.props.dispatch.showCamera(true);
    }

    onReadCode(code) {
        console.log(MapComponent);
        // console.log(`
        //     Data: ${code.data}
        //     Type: ${code.type}
        //     ----------------------------
        // `);
      //   this.props.dispatch.showCamera(false);
    }

    render() {
        /*const camera = this.props.showCamera ? (
            <Camera
                ref={cam => this.camera = cam}
                style={styles.camera}
                captureAudio={false}
                onBarCodeRead={this.onReadCode}
                barcodeTypes={[Camera.constants.BarCodeType.pdf417]}
            />
        ) : null;*/


        return (
            <View style={ {} }>
                {/*<Camera
                    ref={cam => this.camera = cam}
                    style={styles.camera}
                    captureAudio={false}
                    onBarCodeRead={this.onReadCode}
                    barcodeTypes={[Camera.constants.BarCodeType.pdf417]}
                />*/}
                <MapComponent style={styles.map} />
            </View>
        );
    }
}

export default connect(stateMap, dispatchMap)(RegistryPage);
