// React.
import React from 'react';
import { Text, TouchableHighlight, TextInput, View, TouchableOpacity, Modal } from 'react-native';
// Styles.
import { ConfirmIdentityModalStyles as styles } from '../styles';
// Components.
import Button from './button';

const ConfirmIdentityModal = (props) => 
    <Modal animationType={"slide"} transparent={false} visible={props.visible} supportedOrientations={["landscape"]}>   
            <View style={styles.modalContainer}>
                <View style={styles.modalContentContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Is this you?</Text>
                    </View>
                    <View style={styles.triangle} />
                    <View style={styles.personalInformationContainer}>
                        <Text style={styles.title} >{ props.person.name }</Text>
                        <View style={ styles.separator } />
                        <Text style={styles.subtitle} >{ props.person.id }</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} color={'#FFFFFF'} title="Yes" onPress={ () => props.processAnswer('YES') } />
                        <Button style={styles.button} color={'#FFFFFF'} title="No"  onPress={ () => props.processAnswer('NO')  } />
                    </View>
                </View>
            </View>
        
    </Modal> 
;

export default ConfirmIdentityModal;