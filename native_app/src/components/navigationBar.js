import React from 'react';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, StatusBar, ImageBackground } from 'react-native';

const Button = (props) => 
    <NavButton onPress={props.onPress}>
        <NavButtonText style={ { color : 'rgb(1, 45, 178)', fontSize: 14 } }>
            { props.title }
        </NavButtonText>
    </NavButton>
;

const styles = {

  navBar: {    
    borderTopWidth: 0,
    borderBottomColor: 'rgb(1, 45, 178)',
    borderBottomWidth: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    padding: 15,
  }

};

class AppNavBar extends React.PureComponent {

    render() {
        return (
            <NavBar style={styles} >
                <Button title="Go Back" onPress={() => this.props.navigation.goBack() } />
                <NavTitle>{this.props.title}</NavTitle>
                <Button title="Home" onPress={() => this.props.navigation.navigate('Home') } />
            </NavBar>  
        )
  }

};

export default AppNavBar;