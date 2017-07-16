import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
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
    }
});

const stateMap = state => ({
    showCamera: state.registry.showCamera
});

const dispatchMap = dispatch => ({
    dispatch: bindActionCreators(actionCreators, dispatch)
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
        console.log(code);
      //   this.props.dispatch.showCamera(false);
    }

    render() {
        const camera = this.props.showCamera ? (
            <Camera
                ref={cam => this.camera = cam}
                style={styles.camera}
                captureAudio={false}
                onBarCodeRead={this.onReadCode}
                barcodeTypes={['org.iso.pdf417']}
            />
        ) : null;



        return (
            <View style={styles.registryPage}>
                <Camera
                    ref={cam => this.camera = cam}
                    style={styles.camera}
                    captureAudio={false}
                    onBarCodeRead={this.onReadCode}
                    barcodeTypes={['org.iso.pdf417']}
                />
            </View>
        );
    }
}

export default connect(stateMap, dispatchMap)(RegistryPage);
