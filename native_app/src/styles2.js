import { StyleSheet } from 'react-native';
import { colors, sizes, fontWeight } from './constants';

const styles = StyleSheet.create({

    registryPageScanTab: {
        backgroundColor: colors.black,
        height: '100%',
        padding: 15,
    },

    registryPageSearchTab: {
        backgroundColor: colors.white,
        height: '100%',
        padding: 30,
    },

    title : {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20,
    },

    buttonSuccess : {
        borderWidth: 3,
        borderColor: colors.green
    },

    registryTabButtons : { 
        backgroundColor:'white',
        transform: [{'translate':[0,0,1]}] 
    },

    registrySelectedTabButtons : {
        color: 'red',
        transform: [{'translate':[0,0,1]}] 
    },

    question: {
        color: colors.white,
        marginTop: 30,
        marginBottom: 30,
        padding: 5,
        fontSize: 20,
        width: '50%',
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: colors.blue,
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

    IOSCamera: {
        width: '100%',
        height: '97%'
    },

});

export default styles; 