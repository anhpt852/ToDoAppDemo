import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Platform,
    Keyboard,
    Image
} from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
// const { width, height } = Dimensions.get('window');
import styleMain from '../../styles/styles';
import Config from '../../commons/Config';

class CommonTextField extends Component {

    constructor(props) {
        super(props);
        this.focus = this.focus.bind(this);
        this.enableGreenLine = this.enableGreenLine.bind(this);
        this.disableGreenLine = this.disableGreenLine.bind(this);
    };

    onChangeText = (text) => {
        this.props.onChangeText(this.props.name, text);
    }

    focus() {
        this.refs.txt.focus();
    }

    enableGreenLine() {
        this.refs.line.setNativeProps({ style: { backgroundColor: '4AA974' } });
    }

    disableGreenLine() {
        this.refs.line.setNativeProps({ style: { backgroundColor: Config.ColorTextBlack } });
    }

    render() {
        const { container, containerFreeWidth, line, text, textfield, textError, rightImage } = styles;
        const { mediumText } = styleMain;
        
        var style = [textfield];
        if (this.props.alignTextInfo) {
            style.push({textAlign:this.props.alignTextInfo})
        }
        if (this.props.textColor) {
            style.push({color:this.props.textColor})
        }
        if (this.props.height && this.props.height > 0) {
            style.push({height:this.props.height})
        }
        if (this.props.fontSize) {
            style.push({fontSize:this.props.fontSize})
        }
        

        return (
            <View onLayout={this.props.onLayout} style={this.props.freeSizeWidth ? containerFreeWidth : container} pointerEvents={this.props.pointerEvents}>
                <View style={styles.viewInput}>
                    {this.props.title && <Text 
                    style={this.props.titleColor ? [text,{'color':this.props.titleColor}] :text}>
                        {this.props.title}
                    </Text>}
                    <TextInput
                        onChangeText={this.onChangeText.bind(this)}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={Config.ColorTextGrayPlaceHolder}
                        style={style}
                        numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : 1}
                        ellipsizeMode={'tail'}
                        secureTextEntry={this.props.secure}
                        keyboardType={this.props.keyboardType}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        value={this.props.value}
                        maxLength={this.props.maxLength}
                        editable={this.props.editable}
                        multiline={this.props.multiline}
                        // onBlur={this.props.onBlur ? this.props.onBlur : this.disableGreenLine}
                        // onFocus={this.props.onFocus ? this.props.onFocus : this.enableGreenLine}
                        returnKeyType={this.props.returnKeyType}
                        ref={'txt'}
                        onSubmitEditing={this.props.onSubmitEditing}
                        autoCapitalize={'none'}
                    />
                    {this.props.rightImage && this.props.value.length === 0 && <Image style={rightImage} source={this.props.rightImage}/>}
                </View>
                <View style={line} ref={'line'} />
                <Text style={textError}> {this.props.errorText}</Text>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width - 80,
        marginLeft:40,
        marginRight:40
    },
    containerFreeWidth: {
        marginLeft: 10,
        marginRight: 10,
    },
    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#4DC4BA',
        fontSize: 14,
    },
    textError: {
        color: Config.ColorTextRed,
        fontSize: 10,
        paddingTop: 3,
        paddingBottom: 3,
    },
    line: {
        marginLeft: 0,
        marginRight: 0,
        height: 1,
        backgroundColor: '#4DC4BA',
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
                height: 44,
            },
            android: {
                marginLeft: -5,
            },
        }),
        
        fontSize: 14,
        color: '#1D1D25',
        flex: 1,
    },
    
    viewInput:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    rightImage:{
        width: 20,
        height: 20,
        marginLeft: 5
    }
});
AppRegistry.registerComponent('CommonTextField', () => CommonTextField);
export default CommonTextField