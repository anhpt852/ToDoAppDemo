import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Keyboard,
    Platform,
    Dimensions,
    TextInput
} from 'react-native';
import styleMain from '../../styles/styles';
import Config from '../../commons/Config';
// import icDown from '../../Images/Register/ic_down.png';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
var { height, width } = Dimensions.get('window');
function RenderText(props) {
    if ( _.find(props.items, { id: props.selectedId }) !== undefined && props.selectedId !== -1) {
        return (
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.textContent}>
                {
                    _.find(props.items, { id: props.selectedId }).value
                }
            </Text>
        )
    } else {
        return (
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={{
                flex: 1,
                // height: 35,
                fontSize: 18,
                marginTop: 10,
                marginBottom: 10,
                paddingLeft: 0,
                color: props.placeholderTextColor ? props.placeholderTextColor : Config.ColorTextGrayPlaceHolder,
            }}>
                {props.placeholder}
            </Text>
        )
    }

}
 
class CommonDropDownPopupObjectInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedId: props.selectedId ? props.selectedId : null
        }
        this.onPressAction = this.onPressAction.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedId: nextProps.selectedId ? nextProps.selectedId : null
          });
    }

    onPressAction(e) {
        const arr = this.props.items;
        if (_.isEmpty(arr)) {
            if (this.props.handleEmptyAction) this.props.handleEmptyAction();
            return;
        }

        const self = this;

        Navigation.showModal({
            component: {
                name: 'ShareUp.WheelPickerWithObjectInput',
                passProps: {
                  onDismiss: () => {
                      Keyboard.dismiss();
                      if (self.props.onDismiss) {
                          self.props.onDismiss();
                      }
                  },
                  onConfirm: (_id) => {
                      self.setState({
                          selectedId: _id
                      });
                      if (self.props.onConfirm) {
                          self.props.onConfirm(_.find(this.props.items, { id: _id }));
                      }
                  },
                  dismissBtnText: self.props.dismissBtnText,
                  confirmBtnText: self.props.confirmBtnText,
                  selectedId: self.state.selectedId,
                  itemList: arr,
                  title: self.props.titleText,
                  error: self.props.errorText,
                },
                options: {
                  layout: { backgroundColor: 'transparent' },
                  screenBackgroundColor: 'transparent',
                  modalPresentationStyle: Platform.OS === 'ios' ? 'overFullScreen' :'overCurrentContext',
                  topBar: {
                    visible: false,
                    height: 0
                  },
                  bottomTabs: {
                    visible: false,
                    animate: true,
                    drawBehind: true
                  }
                }
              }
          });
    }

    render() {
        const { container, containerFreeWidth, line, text, textfield, textError, textTitle } = styles;
        const { mediumText } = styleMain;

        var style = [textfield];
        if (this.props.alignTextInfo) {
            style.push({textAlign:this.props.alignTextInfo})
        }
        if (this.props.textColor) {
            style.push({color:this.props.textColor})
        }

        let selected = '';
        if(_.find(this.props.items, { id: this.state.selectedId })){
            selected = _.find(this.props.items, { id: this.state.selectedId }).value;
        } 
        return (
            <View onLayout={this.props.onLayout} style={this.props.freeSizeWidth ? containerFreeWidth : container} pointerEvents={this.props.pointerEvents}>
                <TouchableOpacity onPress={this.onPressAction} style={styles.viewInput}>
                    {this.props.title && <Text 
                    style={this.props.titleColor ? [text,{'color':this.props.titleColor}] :text}>
                        {this.props.title}
                    </Text>}
                    <TextInput
                        placeholder={this.props.placeholder}
                        placeholderTextColor={Config.ColorTextGrayPlaceHolder}
                        style={style}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        secureTextEntry={this.props.secure}
                        keyboardType={this.props.keyboardType}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        value={selected}
                        pointerEvents="none"
                        maxLength={this.props.maxLength}
                        editable={false}
                        // onBlur={this.props.onBlur ? this.props.onBlur : this.disableGreenLine}
                        // onFocus={this.props.onFocus ? this.props.onFocus : this.enableGreenLine}
                        returnKeyType={this.props.returnKeyType}
                        ref={'txt'}
                        onSubmitEditing={this.props.onSubmitEditing}
                        autoCapitalize={'none'}
                    />
                </TouchableOpacity>
                <View style={line} ref={'line'} />
                <Text style={textError}> {this.props.errorText}</Text>
            </View>
        );
    }
}


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
        // 
        fontSize: 14,
        color: '#1D1D25',
        flex: 1,
    },
    
    viewInput:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    }
});

AppRegistry.registerComponent('CommonDropDownPopupObjectInput', () => CommonDropDownPopupObjectInput);
export default CommonDropDownPopupObjectInput;

