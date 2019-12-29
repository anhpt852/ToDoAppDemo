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
 
class CommonDropDownPopupObjectInputWithIcon extends Component {

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
        const { container, containerFreeWidth, content, line, text, textfield, textError, textTitle } = styles;
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
                <TouchableOpacity onPress={this.onPressAction} disabled={this.props.disable} style = {content}>
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
                            placeholder={this.props.placeholder}
                            placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : Config.ColorTextGrayPlaceHolder}
                            style={style}
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            secureTextEntry={this.props.secure}
                            keyboardType={this.props.keyboardType}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            value={selected}
                            maxLength={this.props.maxLength}
                            editable={false}
                            returnKeyType={this.props.returnKeyType}
                            ref={'txt'}
                            onSubmitEditing={this.props.onSubmitEditing}
                            pointerEvents="none"
                        />
                    </View>
                </TouchableOpacity>
            
                <View style={this.props.lineColor? [line,{backgroundColor:this.props.lineColor}] : line} ref={'line'}/>
                <Text style={textError}> {this.props.errorText}</Text>

            </View>
        );
    }
}


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
        // 
        fontFamily:'Helvetica Neue',
        paddingVertical: 0,
        marginVertical: 0,
        borderWidth: 0, 
        color: '#5c5c5c',
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

AppRegistry.registerComponent('CommonDropDownPopupObjectInputWithIcon', () => CommonDropDownPopupObjectInputWithIcon);
export default CommonDropDownPopupObjectInputWithIcon;

