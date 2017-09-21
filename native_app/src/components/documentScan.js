import React from 'react';
import { Platform, requireNativeComponent, StyleSheet, Text, View, Button } from 'react-native';
// import Camera from 'react-native-camera';
import DocumentIdService from '../services/DocumentIdService';
import styles from '../styles2';
import ConfirmIdentityModal from './confirmIdentityModal';

const IOSCamera = requireNativeComponent('RNTMap', DocumentScan, {
    nativeOnly: { onScanChange: true }
});

class DocumentScan extends React.PureComponent {
    constructor() {
        super();
        this.readCode  = this.readCode.bind(this);
        this.state = {
            person : {}
        };
    }

    readCode(result) {
        const data = DocumentIdService.decodeDocumentID(
            (Platform.OS === 'ios') ? result.nativeEvent.data : (Platform.OS === 'android') ? result.data : null
        );

        console.log('--- DATA ---', data);

        // Process data.
        // ---
        
        const person = {
            name       : 'Jorge Daniel',
            lastname_1 : 'Valverde',
            lastname_2 : 'Matarrita',
            id         : '304870421',
        }; // DocumentIdService.searchByDocumentId(documentId);

        this.setState({ 
            person : {
                name : person.name+' '+person.lastname_1+' '+person.lastname_2,
                id   : person.id
            }
        });

    }

    hideModal () {
        this.setState({ person : {} });
    }

    processAnswer (answer) {

        switch (answer) {
            case 'YES' :
                this.hideModal();
                this.props.onPersonalInformationGathered();
                break;
            case 'NO' : 
            default :
                this.hideModal();
                break;
        }

    };

    render() {
        /*const CodeReader = Platform.select({
            ios     : () => <IOSCamera 
                                style={styles.IOSCamera}
                                onScanChange={this.onReadCode} 
                            />,
            android : () => <Camera
                                ref={cam => this.camera = cam}
                                style={styles.camera}
                                captureAudio={false}
                                onBarCodeRead={this.onReadCode}
                                barcodeTypes={[Camera.constants.BarCodeType.pdf417]}
                            />,
        })();*/

        return (
            <View>
                <IOSCamera 
                    style={styles.IOSCamera}
                    onScanChange={this.readCode} 
                />
                <ConfirmIdentityModal
                    visible={ (Object.keys(this.state.person).length > 0) }
                    person={this.state.person}
                    processAnswer={this.processAnswer.bind(this)}
                />
            </View>
        );
    }
}

export default DocumentScan;