import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  View,
  Keyboard
} from 'react-native';
import styles from "./TodoDetailStyles";
import { connect } from 'react-redux';
import DateFormat from 'dateformat';
import Navbar from '../../components/NavBar/NavBar'
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonTextFiledWithIcon from '../../components/TextField/CommonTextFiledWithIcon';
import CommonTextField from '../../components/TextField/CommonTextField';
import CommonDropDownPopupObjectInputWithIcon from '../../components/TextField/CommonDropDownPopupObjectInputWithIcon';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { todoOnChangeText, todosCreate, todosUpdate, todosDelete } from '../../actions';
import _ from 'lodash';
const img_nav_background = require('../../images/NavBar/img_navigation_bar.png');
const ic_remove_todo = require('../../images/NavBar/ic_remove_todo.png');
class ToDoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false
        }
        if(this.props.item){
            this.props.todoOnChangeText({ prop: 'title', value: this.props.item.title })
            this.props.todoOnChangeText({ prop: 'content', value: this.props.item.content })
            this.props.todoOnChangeText({ prop: 'priority', value: this.props.item.priority })
            const dateFormat = DateFormat(moment(this.props.item.datetime));
            this.props.todoOnChangeText({ prop: 'datetime', value: moment(this.props.item.datetime).toDate() })
            this.props.todoOnChangeText({ prop: 'datetimeText',value: moment(this.props.item.datetime).format('hh:mm A - dddd, MMM DD YYYY') })
        } else {
            this.props.todoOnChangeText({ prop: 'title', value: '' })
            this.props.todoOnChangeText({ prop: 'titleError', value: '' })
            this.props.todoOnChangeText({ prop: 'content', value: '' })
            this.props.todoOnChangeText({ prop: 'contentError', value: '' })
            this.props.todoOnChangeText({ prop: 'priority', value: {
                id: 1,
                value: 'Cao',
            } })
            this.props.todoOnChangeText({ prop: 'priorityError', value: '' })
            this.props.todoOnChangeText({ prop: 'datetime', value: new Date() })
            this.props.todoOnChangeText({ prop: 'datetimeText',value: '' })
            this.props.todoOnChangeText({ prop: 'datetimeError', value: '' })
        }
    };

    onRemove(){
        this.props.todosDelete({ uid: this.props.item.uid});
    }

    onConfirmClick(){
        const {title, titleError, content , contentError, priority, priorityError, datetimeText, datetime} = this.props;
        var isValidate = true;
        if (title.length <= 0) {
            isValidate = false;
            this.props.todoOnChangeText({ prop: 'titleError', value: 'Vui lòng nhập tiêu đề' })
        }
        if (content.length <= 0) {
            isValidate = false;
            this.props.todoOnChangeText({ prop: 'contentError', value: 'Vui lòng nhập nội dung' })
        }
        if (_.isEmpty(priority)) {
            isValidate = false;
            this.props.todoOnChangeText({ prop: 'priorityError', value: 'Vui lòng nhập mức độ ưu tiên' })
        }
        if (datetimeText.length <= 0) {
            isValidate = false;
            this.props.todoOnChangeText({ prop: 'datetimeError', value: 'Vui lòng nhập ngày tháng nhắc viêc' })
        }

        if(isValidate){
            if(!this.props.item) {
                this.props.todosCreate({title, content , priority, datetime});
            } else {
                this.props.todosUpdate({title, content , priority, datetime, uid: this.props.item.uid});
            }
        }
        
    }

    onCompleteClick(){
        const {title, content , priority, status, datetime, uid} = this.props.item;
        this.props.todosUpdate({title, content, priority, datetime, status: !status, uid});
    }

    showDateTimePicker(){
        this.setState({isDateTimePickerVisible:true});
    }


    hideDateTimePicker() {
        this.props.todoOnChangeText({ prop: 'datetime', value: new Date() })
        this.props.todoOnChangeText({ prop: 'datetimeText', value: '' })
        this.setState({isDateTimePickerVisible:false});
    } 
    
    handleDateTimePicker = (date) => {
        const dateFormat = moment(date).format('hh:mm A - dddd, MMM DD YYYY');
        this.props.todoOnChangeText({ prop: 'datetime', value: date })
        this.props.todoOnChangeText({ prop: 'datetimeText',value: dateFormat })
        this.setState({isDateTimePickerVisible:false});
    };
      
    render() {
        const minDateFrom = new Date();
    
        const {container, content, topView, middleView, todoDateView, saveButton, saveButtonView, saveButtonTitle } = styles;
        return (
            <View style={container}>
                <Navbar
                    hasBackBtn
                    title="Chi tiết nhắc việc"
                    hasRightBtn = {this.props.item ? true : false}
                    customRightImg={ic_remove_todo}
                    backgroundImg={img_nav_background}
                    onRightPressed={this.onRemove.bind(this)}
                />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView
                    ref={scrollView => this.scrollView = scrollView}
                    // contentContainerStyle={styles.scrollView}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                >
                <View style={content}>
                    <View style={topView}>
                        <CommonTextFiledWithIcon
                            freeSizeWidth
                            titleText="Tiêu đề"
                            placeholder="Nhập tiêu đề"
                            lineColor={'#1d8468'}
                            // image={icName}
                            titleColor={'#1d8468'}
                            onChangeText={(value) => this.props.todoOnChangeText({ prop: 'title', value })}
                            value={this.props.title}
                            errorText={this.props.titleError}
                        />
                        <View style={{width:"100%"}}>
                            <CommonTextFiledWithIcon
                                freeSizeWidth
                                name="description"
                                titleText="Mô tả"
                                placeholder="Nhập mô tả"
                                multiline={true}
                                numberOfLines={4}
                                height={Platform.OS === 'android' ? 0 : 80}
                                lineColor={'#1d8468'}
                                titleColor={'#1d8468'}
                                multiline={true}
                                onChangeText={(value) => this.props.todoOnChangeText({ prop: 'content', value })}
                                value={this.props.content}
                                errorText={this.props.contentError}
                            />
                        </View>
                    </View>
                    <View style={middleView}>
                        <CommonDropDownPopupObjectInputWithIcon
                            items={[
                                {
                                    id: 1,
                                    value: 'Cao',
                                },
                                {
                                    id: 2,
                                    value: 'Bình thường',
                                },
                                {
                                    id: 3,
                                    value: 'Thấp',
                                },
                            ]}
                            freeSizeWidth
                            titleText="Chọn mức độ ưu tiên"
                            lineColor={'#1d8468'}
                            titleColor={'#1d8468'}
                            errorText={this.props.priorityError}
                            selectedId={this.props.priority.id}
                            onDismiss={() => {
                                console.log('on Dismis');
                            }}
                            onConfirm={(object) => {
                                this.props.todoOnChangeText({ prop: 'priority',value: object })
                                console.log('on comfirm');
                                console.log(object.value);
                                console.log(object.id);
                            }}
                        /> 
                        <View style={todoDateView}>
                            <TouchableOpacity
                                onPress={()=>this.showDateTimePicker()}
                            >
                                <CommonTextFiledWithIcon
                                    freeSizeWidth
                                    titleText="Thời gian thực hiện"
                                    placeholder="Nhập thời gian thực hiện"
                                    editable={false}
                                    lineColor={'#1d8468'}
                                    titleColor={'#1d8468'}
                                    value={this.props.datetimeText}
                                    errorText={this.props.datetimeError}
                                    pointerEvents='none'
                                />
                                <DateTimePicker
                                    mode={'datetime'}
                                    is24Hour={false}
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDateTimePicker.bind(this)}
                                    onCancel={this.hideDateTimePicker.bind(this)}
                                    minimumDate={minDateFrom}
                                    date={this.props.datetime}
                                    cancelTextIOS='HỦY'
                                    confirmTextIOS='XÁC NHẬN'
                                    titleIOS='Từ ngày'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={saveButton}>
                        <TouchableOpacity style={saveButton} onPress={this.onConfirmClick.bind(this)}>
                            <View style={saveButtonView}>
                                <Text style={saveButtonTitle}>{this.props.item ? 'Lưu' : 'Tạo'}</Text>
                            </View>
                        </TouchableOpacity>
                        {this.props.item && !this.props.item.status && <TouchableOpacity style={saveButton} onPress={this.onCompleteClick.bind(this)}>
                            <View style={[saveButtonView,{paddingHorizontal: 20,paddingVertical: 10}]}>
                                <Text style={saveButtonTitle}>{'Hoàn thành'}</Text>
                            </View>
                        </TouchableOpacity>}
                    </View>
                    
                </View>
                </KeyboardAwareScrollView >
            </TouchableWithoutFeedback>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { title, titleError, content , contentError, priority, priorityError, datetime, datetimeText, datetimeError} = state.todo;

    return { title, titleError, content , contentError, priority, priorityError, datetime, datetimeText, datetimeError};
};

AppRegistry.registerComponent('ToDoDetail', () => ToDoDetail);
export default connect(mapStateToProps, { todoOnChangeText, todosCreate, todosUpdate, todosDelete }) (ToDoDetail)