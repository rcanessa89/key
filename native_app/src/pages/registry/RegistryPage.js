import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Camera from 'react-native-camera';
import * as actionCreators from './action-creators';
import { colors, sizes } from '../../constants';
import DocumentIdService from '../../services/DocumentIdService';

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

    camera: {
        flex: 1,
        width: '100%',
        height: '100%'
    },

    welcome: {
        fontSize: 32
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
        this.decodeDocumentID = new DocumentIdService().decodeDocumentID;
    }

    openScanner() {
        
    }

    onReadCode(code) {

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
                <View>
                    <Text>Welcome!</Text>
                    <Text>Scan your ID or fill the form</Text>
                </View>
            </View>
        );
    }
}

export default connect(stateMap, dispatchMap)(RegistryPage);
