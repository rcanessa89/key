// React.
import React from 'react';
import { Text, TextInput, View, Image, TouchableHighlight, StatusBar } from 'react-native';
// Redux.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Dev.
import { NavigationActions } from 'react-navigation'
// Styles.
import { HomeStyles as styles } from '../../styles';
import { colors } from '../../constants';
// Components.
import BackgroundImage from '../../components/backgroundImage';
import Button from '../../components/button';

class HomePage extends React.PureComponent {

    navigate (routeName) {
        this.props.navigation.navigate(routeName);
    }

    render () {
        const imgData = { curtain : 'transparent', src : require('../../images/kgbg.png'), };
 
        return (
            <View style={styles.pageContainer}>
                <BackgroundImage imgData={imgData} content={ (props) => 
                    <View style={styles.menuContainer} >
                        <Image style={styles.logo} source={require('../../images/kg.png')} />
                        <Button color={colors.white} title='Registry'       onPress={this.navigate.bind(this, 'RegistryType')}   style={[styles.button, {marginBottom: 15}]} />
                        <Button color={colors.white} title='Device Control' onPress={this.navigate.bind(this, 'RegistryType')} style={styles.button}  />
                    </View>
                }/>
            </View>
        );
    }
    
}

const stateMap    = state => ({ });
const dispatchMap = dispatch => ({ });

export default connect(stateMap, dispatchMap)(HomePage);