import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    Platform,
} from 'react-native';
import Picker from '../react-native-wheel-picker'
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import Lightbox from '../Lightbox/BaseLightbox';
var PickerItem = Picker.Item;
var { height, width } = Dimensions.get('window');

class WheelPickerWithObjectInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: props.selectedId ? _.find(props.itemList, { id: props.selectedId }) : props.itemList[0],
            selectedItemId: props.selectedId ? props.selectedId : props.itemList[0].id,
            selectedIndex: props.selectedId ? _.findIndex(props.itemList, { id: props.selectedId }) : 0
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onPickerSelect = this.onPickerSelect.bind(this);
        this.dismissWheelPicker = this.dismissWheelPicker.bind(this);
    }

    componentDidMount() {
        Keyboard.dismiss();
    }

    dismissWheelPicker(e) {
        console.log('abc');
        Actions.pop();
    }

    onPickerSelect(index) {
        this.setState({
            selectedIndex: index,
            selectedItem: this.props.itemList[index],
            selectedItemId: this.props.itemList[index].id
        });
    }

    onDismiss() {
        Actions.pop();
    }

    onConfirm() {
        console.log(this.state.selectedItem);
        if (this.state.selectedItem) {
            this.props.onConfirm(this.state.selectedItem.id);
        }
        Actions.pop();
    }

    onAddItem = () => {
        // var name = 'aaaaaa'
        // if (this.state.itemList.indexOf(name) == -1) {
        //     this.state.itemList.push(name)
        // }
        // this.setState({
        //     selectedItem: this.state.itemList.indexOf(name),
        // })
    }
    render() {
        var { itemList } = this.props;


        return (
            <Lightbox style={styles.container}>
                <TouchableOpacity activeOpacity={1} style={styles.containerTouch} onPress={this.dismissWheelPicker}>
                </TouchableOpacity>
                <View style={styles.wheelContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <View style={styles.subWheelContainer}>
                        <View style={{ marginBottom: 50 }}>
                            {this.props.itemList && _.size(this.props.itemList) > 0 &&
                                <Picker style={{ width: width, height: '100%', paddingLeft: 5, paddingRight: 5, }}
                                    selectedValue={this.state.selectedIndex}
                                    itemStyle={{ color: "#0059B0", fontSize: 20 }}
                                    onValueChange={(index) => this.onPickerSelect(index)}>
                                    {this.props.itemList.map((object, i) => (
                                        <PickerItem label={object.value} value={i} key={"key" + object.id} />
                                    ))}
                                </Picker>
                            }
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.dismissBtn} onPress={this.onDismiss}>
                                <Text style={styles.btnText}>
                                    {this.props.dismissBtnText ? this.props.dismissBtnText : "ĐÓNG"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmBtn} onPress={this.onConfirm} >
                                <Text style={styles.btnText}>
                                    {
                                        this.props.confirmBtnText ?
                                            this.props.confirmBtnText :
                                            "CHỌN"
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Lightbox>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#000000',
    },
    title: {
        marginLeft: 10,
        marginBottom: 10,
        color: '#FFFFFF',
        fontSize: 18
    },
    wheelContainer: {
        width: width,
        position: 'absolute',
        bottom: 0,
    },
    subWheelContainer: {
        width: width,
        ...Platform.select({
            ios: {
                height: 250,
            },

            android: {
                height: 255,
            },
        }),
        backgroundColor: 'white',
    },
    btnContainer: {
        flexDirection: 'row',
        position: 'absolute',
        ...Platform.select({
            ios: {
                bottom: 0,
            },
            android: {
                bottom: 20,
            },
        }),
    },
    dismissBtn: {
        flex: 1,
        backgroundColor: '#fcab53',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmBtn: {
        flex: 1,
        backgroundColor: '#008a41',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 15
    },
    containerTouch: {
        width: width,
        height: height,
        backgroundColor: 'transparent',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
AppRegistry.registerComponent('WheelPickerWithObjectInput', () => WheelPickerWithObjectInput);
export default WheelPickerWithObjectInput