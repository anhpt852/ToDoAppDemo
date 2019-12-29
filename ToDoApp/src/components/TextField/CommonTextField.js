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
    };

    onChangeText = (text) => {
        this.props.onChangeText(this.props.name, text);
    }

    focus() {
        this.refs.txt.focus();
    }

    render() {
        const { container, containerFreeWidth, line, text, textfield, textError } = styles;
        const { mediumText } = styleMain;

        return (
            <View onLayout={this.props.onLayout} style={[this.props.freeSizeWidth ? containerFreeWidth : container, this.props.style]} pointerEvents={this.props.pointerEvents}>
                <View style={styles.viewInput}>
                    <TextInput
                        onChangeText={this.onChangeText.bind(this)}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={'#56575B'}
                        style={textfield}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
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
                    {this.props.rightImage && <View>
                        <Image
                            source={this.props.rightImage}
                            style={styles.rightImage}
                        />
                    </View>}
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
        marginLeft:40,
        marginRight:40,
        // backgroundColor: '#121419',
    },
    containerFreeWidth: {
        marginLeft: 10,
        marginRight: 10,
    },
    text: {
        color: '#56565C',
        fontSize: 12,
        paddingTop: 10
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
        flex: 1,
        height: 50,
        fontSize: 15,
        // color: '#FFFFFF'
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 16,
        tintColor: '#C9C9C9'
    },
    viewInput:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#ECEDF2',
        borderRadius: 30,
        borderWidth: 1,
        paddingLeft: 15,
        borderColor: '#ECEDF2'
    },
    rightImage:{
        width: 20,
        height: 20,
        marginHorizontal: 15,
        tintColor: '#C9C9C9'
    }
});
AppRegistry.registerComponent('CommonTextField', () => CommonTextField);
export default CommonTextField