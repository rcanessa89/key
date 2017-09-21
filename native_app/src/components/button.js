import React from 'react';
import { TouchableHighlight, Text } from 'react-native';

export default (props) =>
    <TouchableHighlight 
        activeOpacity={1}
        underlayColor={'rgba(0, 0, 0, 0.35)'}
        style={props.style} 
        onPress={props.onPress}>
        <Text style={ { color: props.color, textAlign: 'center' } } >{ props.title }</Text>
    </TouchableHighlight>
;
