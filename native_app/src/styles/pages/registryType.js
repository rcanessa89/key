import { colors } from '../../constants';

const RegistryTypeStyles = {

   pageContainer :{ 
       height: '100%',
    },

    registryTypeContainer : {
        flex: 1,
        flexDirection: 'row',
    },

    bgImage : {
        backgroundColor: colors.blue,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    registryType : {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    registryLightBlue : {
        backgroundColor: 'rgba(49, 98, 205, 0.85)',
    },

    registryDarkBlue : {
         backgroundColor: 'rgba(1, 45, 178, 0.85)',
    },

    button : {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 5,
        paddingTop    : 10,
        paddingRight  : 15,
        paddingBottom : 10,
        paddingLeft   : 15,
    },


};;

export default RegistryTypeStyles;