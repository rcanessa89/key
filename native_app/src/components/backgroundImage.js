import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  View,
  Text,
  Button,
} from 'react-native';

// const imgSrc = require('../images/terracampus.png');
const styles = {

    container : {
        flex: 1,
        backgroundColor: '#eee',
    },

    imageContainer : {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },

    image : {
        // flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },

    contentContainer : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text : {
        textAlign: 'center',
        fontSize: 40,
        color: 'whitemoke'
    },
    
};


class BackgroundImage extends Component {
    render() {
    //  const { navigate } = this.props.navigation;
    const Content = this.props.content;
    const { src, curtain } = this.props.imgData;

    return (
        <View style={styles.container} >
            <View style={styles.imageContainer} >
                {
                    (src) ? <Image style={styles.image} source={src} /> : null
                }
            </View>
            <View style={ { ...styles.contentContainer, backgroundColor: curtain, }} >
                <Content />
            </View>
      </View>
    );
  }
}

export default BackgroundImage;