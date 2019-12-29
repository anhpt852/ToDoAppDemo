import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Button,
    Platform,
    Image
} from 'react-native';

import styleMain from '../../styles/styles';
import Config from '../../commons/Config';

class PasswordTextField extends Component {

    constructor(props) {
        super(props);
        // this.actionForgotPass = this.actionForgotPass.bind(this);
        this.showPassWord = this.showPassWord.bind(this);

        this.state = {
            showPassword: true
        }
    };

    showPassWord() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    onChangeText = (text) => {
        this.props.onChangeText(this.props.name, text);
    }

    render() {
        const { container, line, text, textfield, view,
            touchableForgot, textForgot, textError } = styles;
        const { mediumText } = styleMain;
        
        return (
            <View style={container}>

                <View style={styles.viewInput}>
                    {/* <Image
                        source={this.props.image}
                        style={styles.image}
                    /> */}
                    <TextInput
                        onChangeText={this.onChangeText.bind(this)}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={'#56575B'}
                        underlineColorAndroid="transparent"
                        style={textfield}
                        secureTextEntry={this.state.showPassword}
                        autoCorrect={false}
                        onBlur={this.props.onBlur ? this.props.onBlur : this.disableGreenLine}
                        onFocus={this.props.onFocus ? this.props.onFocus : this.enableGreenLine}
                        autoCapitalize={'none'}
                    />
                    {/* <TouchableOpacity onPress={this.showPassWord}>
                        <Image
                            source={this.props.imageLook}
                            style={styles.imageLook}
                        >
                        </Image>
                    </TouchableOpacity> */}
                </View>
                <Text style={textError}> {this.props.errorText}</Text>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width - 80,
        marginLeft: 40,
        marginRight: 40,
        // backgroundColor: '#121419',
    },
    view: {
        flexDirection: 'row',
        height: 50,
    },
    text: {
        color: Config.ColorTextGray,
        fontSize: 12,
        paddingTop: 10
    },
    textError: {
        color: Config.ColorTextRed,
        fontSize: 10,
        paddingTop: 3,
        paddingBottom: 3
    },
    line: {
        marginLeft: 0,
        marginRight: 0,
        height: 1,
        backgroundColor: '#C9C9C9',
        ...Platform.select({
            android: {
                paddingBottom: 1
            },
        }),
    },
    textfield: {
        ...Platform.select({
            ios: {
                marginLeft: 0,
                marginRight: 0,
            },
            android: {
                marginLeft: -5,
            },
        }),
        // color:'#FFFFFF',
        height: 50,
        fontSize: 15,
        flex: 1
    },
    touchableForgot: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textForgot: {
        color: Config.ColorTextGray
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 16,
        tintColor: '#C9C9C9'
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#ECEDF2',
        borderRadius: 30,
        borderWidth: 1,
        paddingLeft: 15,
        borderColor: '#ECEDF2'
    },
    imageLook: {
        width: 20,
        height: 20,
        marginLeft: 16,
        tintColor: '#C9C9C9'
    },
});
AppRegistry.registerComponent('PasswordTextField', () => PasswordTextField);
export default PasswordTextField