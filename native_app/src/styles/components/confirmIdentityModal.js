import { colors } from '../../constants';

const ConfirmIdentityModalStyles = {

    modalContainer : { 
        flex: 1,
        justifyContent: 'center',
    },

    modalContentContainer : { 
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },

    buttonContainer : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        width: '100%',
        marginTop: 15,
        padding: 15,
    },

    personalInformationContainer : { 
        marginTop: 15,
        flex: 1,
        alignItems: 'center',
    },

    triangle : {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#f5f5f5',
        transform: [
            { rotate     : '180deg' },
        ]
    },

    header : {
        backgroundColor: '#f5f5f5',
        width: '60%',
        padding: 15,
        borderRadius: 5,
    },

    headerText : {
        color: '#5f7380',
        textAlign: 'center'
    },

    separator : {
        width: 30,
        height: 3,
        backgroundColor: colors.black,
        marginTop: 10,
        marginBottom: 10,
    },

    title : {
        fontSize: 24,
    },

    subtitle : {
        fontSize: 20,
    },

    button : {
        backgroundColor: '#0133cb',
        padding: 15,
        height: 45,
        width: 85,
        marginLeft: 10,
        marginRight: 10,
    },
    
};

export default ConfirmIdentityModalStyles;