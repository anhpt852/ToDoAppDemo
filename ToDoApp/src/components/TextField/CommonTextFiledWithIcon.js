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
    Image,
} from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import styleMain from '../../styles/styles';
import Config from '../../commons/Config';

class CommonTextFiledWithIcon extends Component {

    constructor(props) {
        super(props);
        this.focus = this.focus.bind(this);
    };

    onChangeText = (text) => {
        this.props.onChangeText(this.props.name, text);
    }

    focus() {
        this.refs.txt.focus();
    }


    render() {
        const { container,containerFreeWidth, content ,line, text, textfield, textError } = styles;
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

        return (
            <View onLayout={this.props.onLayout} style={this.props.freeSizeWidth ? containerFreeWidth : container} pointerEvents={this.props.pointerEvents}>
                <View style = {content}>
                    {this.props.image && <Image 
                        source={this.props.image}
                        style={styles.image}
                        resizeMode={'contain'}
                    />}
                    <View style={{flex: 1}}>
                        <Text style={this.props.titleColor? [mediumText, text, {color:this.props.titleColor}] :[mediumText, text]}>
                            {this.props.titleText}
                        </Text>
                        <TextInput
                            onChangeText={this.onChangeText.bind(this)}
                            placeholder={this.props.placeholder}
                            placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : Config.ColorTextGrayPlaceHolder}
                            style={style}
                            numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : 1}
                            multiline={this.props.multiline}
                            ellipsizeMode={'head'}
                            secureTextEntry={this.props.secure}
                            keyboardType={this.props.keyboardType}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            value={this.props.value}
                            maxLength={this.props.maxLength}
                            editable={this.props.editable}
                            returnKeyType={this.props.returnKeyType}
                            ref={'txt'}
                            onSubmitEditing={this.props.onSubmitEditing}
                            autoCapitalize={'none'}
                        />
                    </View>
                </View>
            
                <View style={this.props.lineColor? [line,{backgroundColor:this.props.lineColor}] : line} ref={'line'}/>
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
        marginRight:40,   
    },
    containerFreeWidth: {
        marginLeft: 0,
        marginRight: 0,
    },

    content:{
        alignItems: 'center',
        flexDirection: 'row',
    },

    text: {
        fontFamily:'Helvetica Neue',
        fontSize: 14,
        color: '#56565C',
        // paddingTop: 10
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
        backgroundColor: '#FFFFFF',
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
                marginRight: 30,
                height: 40,
            },
            android: {
                marginLeft: -5,
            },
          }),
        // paddingVertical: 0,
        // marginVertical: 0,
        // borderWidth: 0, 
        color: '#5c5c5c',
        fontFamily:'Helvetica Neue',
        fontSize: 18,
        // backgroundColor: 'yellow'
    },
    viewInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 25,
        height: 25,
        marginRight: 16,
        // tintColor: '#C9C9C9'
    },
});
AppRegistry.registerComponent('CommonTextFiledWithIcon', () => CommonTextFiledWithIcon);
export default CommonTextFiledWithIcon