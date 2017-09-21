import { colors } from '../../constants';

const HomeStyles = {

    pageContainer : {
        height: '100%',
        backgroundColor : colors.blue, 
    },

    menuContainer : { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button : {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
        width: 175,
        borderRadius: 5,
        paddingTop    : 10,
        paddingRight  : 15,
        paddingBottom : 10,
        paddingLeft   : 15,
    },

    text : {
        color: 'rgba(255, 255, 255, 1)', 
        textAlign: 'center',
        fontWeight: '500', 
    },

    underlayColor : 'transparent',

    logo : {
        width: 50,
        height: 30,
        overflow: 'visible',
        marginBottom: 30
    },

};

export default HomeStyles;