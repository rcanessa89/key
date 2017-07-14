// import React from 'react';
// import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import Camera from 'react-native-camera';
// import * as actionCreators from './action-creators';
// import { colors, sizes } from '../../constants';


// const styles = StyleSheet.create({
//     registryPage: {
//         backgroundColor: colors.primary,
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     question: {
//         color: colors.white,
//         marginBottom: 30,
//         paddingLeft: 10,
//         paddingRight: 10,
//         fontSize: 28,
//         textAlign: 'center'
//     },

//     main: {
//         width: '90%',
//     },

//     buttons: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },

//     buttonContainer: {
//         backgroundColor: colors.info,
//         width: '40%'
//     },

//     camera: {
//         flex: 1,
//         width: '100%',
//         height: '100%'
//     }
// });

// const stateMap = state => ({
//     showCamera: state.registry.showCamera
// });

// const dispatchMap = dispatch => ({
//     dispatch: bindActionCreators(actionCreators, dispatch)
// });

// class RegistryPage extends React.PureComponent {
//     constructor() {
//         super();
//         this.openScanner = this.openScanner.bind(this);
//         this.onReadCode = this.onReadCode.bind(this);
//     }

//     openScanner() {
//         this.props.dispatch.showCamera(true);
//     }

//     onReadCode(code) {
//         console.log(code);
//       //   this.props.dispatch.showCamera(false);
//     }

//     render() {
//         const camera = this.props.showCamera ? (
//             <Camera
//                 ref={cam => this.camera = cam}
//                 style={styles.camera}
//                 captureAudio={false}
//                 onBarCodeRead={this.onReadCode}
//                 barcodeTypes={['org.iso.pdf417']}
//             />
//         ) : null;



//         return (
//             <View style={styles.registryPage}>
//                 <Camera
//                     ref={cam => this.camera = cam}
//                     style={styles.camera}
//                     captureAudio={false}
//                     onBarCodeRead={this.onReadCode}
//                     barcodeTypes={['org.iso.pdf417']}
//                 />
//             </View>
//         );
//     }
// }

// export default connect(stateMap, dispatchMap)(RegistryPage);

import React, {
    Component,
} from 'react'
import {
    View,
    StyleSheet,
    Alert,
} from 'react-native'

import Barcode from 'react-native-smart-barcode'
import TimerEnhance from 'react-native-smart-timer-enhance'

class RegistryPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            viewAppear: false,
        };
    }

    render() {

        return (
            <View style={{flex: 1, backgroundColor: 'black',}}>
                {this.state.viewAppear ? <Barcode style={{flex: 1, }}
                                                  ref={ component => this._barCode = component }
                                                  onBarCodeRead={this._onBarCodeRead}/> : null}
            </View>
        )
    }

    componentDidMount() {
        let viewAppearCallBack = (event) => {
            this.setTimeout( () => {
                this.setState({
                    viewAppear: true,
                })
            }, 255)

        }
        this._listeners = [
            this.props.navigator.navigationContext.addListener('didfocus', viewAppearCallBack)
        ]

    }

    componentWillUnmount () {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    }

    _onBarCodeRead = (e) => {
        console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan()
        Alert.alert(e.nativeEvent.data.type, e.nativeEvent.data.code, [
            {text: 'OK', onPress: () => this._startScan()},
        ])
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

}

export default TimerEnhance(RegistryPage)