// React.
import React from 'react';
import { View } from 'react-native';
// Dev.
import SignaturePad from 'react-native-signature-pad';
// Styles.
import { colors} from '../../constants';
import { SignatureRegistryStyles as styles } from '../../styles';
// Components.
import Button from '../../components/button';
import AppNavBar from '../../components/navigationBar';

class RegistryPage extends React.PureComponent {

    constructor () {
        super();
        this.state = {
            signature : null
        }
    }

    signaturePadError = (error) => {
        console.error(error);
    }

    signaturePadChange = ({base64DataUrl}) => {
        this.setState({ signature : base64DataUrl });
    }

    reload () {
       this.props.navigation.navigate('Signature');
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.page}>
                <AppNavBar navigation={this.props.navigation} title='Signature registry' />
                <View style={styles.signaturePadContainer} >
                    <SignaturePad onError={this.signaturePadError}
                                  onChange={this.signaturePadChange}
                                  style={styles.signaturePad} 
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} color={'#FFFFFF'} title="OK"     onPress={navigate.bind(this, 'Confirm')} />
                    <Button style={styles.button} color={'#FFFFFF'} title="Reload" onPress={this.reload.bind(this)} />
                </View>
            </View>
        );
    }
}

export default RegistryPage;