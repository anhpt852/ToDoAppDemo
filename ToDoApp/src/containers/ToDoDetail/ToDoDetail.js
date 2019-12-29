import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from "./TodoDetailStyles";
import { connect } from 'react-redux';
import DateFormat from 'dateformat';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { todoOnChangeText, todosCreate, todosUpdate, todosDelete } from '../actions';

class ToDoDetail extends Component {
    hideDateTimePicker() {
        this.props.todoOnChangeText({ prop: 'datetime', value: new Date() })
        this.props.todoOnChangeText({ prop: 'datetimeText', value: '' })
        stores.isDateTimePickerVisible = false;
    } 
    
    handleDateTimePicker = (date) => {
        const dateFormat = DateFormat(date, 'dd-mm-yyyy');
        this.props.todoOnChangeText({ prop: 'datetime', value: date })
        this.props.todoOnChangeText({ prop: 'datetimeText',value: dateFormat })
        stores.isDateTimePickerVisible= false;
    };
      
    render() {
        const maxDateFrom = new Date();
    
        const {container,topView, middleView, bottomView, saveBtn } = styles;
        return (
            <View style={container}>
                <View style={topView}>
                    <View style={{width:"100%"}}>
                        <CommonTextFiledWithIcon
                            freeSizeWidth
                            titleText="Tên người lập biên bản"
                            placeholder="Nhập tên người lập"
                            editable={this.props.isEditable}
                            lineColor={'#1d8468'}
                            image={icName}
                            titleColor={'#1d8468'}
                            onChangeText={(value) => this.todoOnChangeText({ prop: 'title', value })}
                            value={this.props.title}
                            errorText={this.props.titleError}
                        />
                        <Text style={{ color: '#555555', fontSize: 18, fontFamily:'OpenSans-Bold', marginBottom: 10}}>
                                Ý kiến người vi phạm
                        </Text>
                        <CommonTextField
                            fontSize= {18}
                            freeSizeWidth
                            placeholder="Nhập ý kiến"
                            onChangeText={(value) => this.todoOnChangeText({ prop: 'content', value })}
                            editable={this.props.isEditable === true ? this.state.editable : this.props.isEditable}
                            titleColor={'#1d8468'}
                            multiline={true}
                            numberOfLines={4}
                            height={Platform.OS === 'android' ? 0 : 80}
                            selectable={true}
                            value={this.props.content}
                            errorText={this.props.contentError}
                        />
                    </View>
                </View>
                <View style={middleView}>
                    <CommonDropDownPopupObjectInputWithIcon
                        items={[{
                          id: 1,
                          value: 'Việt Nam',
                          content: 'VN'
                        }]}
                        disable={!this.props.isEditable}
                        freeSizeWidth
                        titleText="Quốc tịch"
                        placeholder="Nhập quốc tịch"
                        image={icFlag}
                        lineColor={'#1d8468'}
                        titleColor={'#1d8468'}
                        onChangeText={this.onChangeNation}
                        errorText={this.props.priorityError}
                        selectedId={this.props.priority.id}
                        onDismiss={() => {
                          console.log('on Dismis');
                        }}
                        onConfirm={(object) => {
                          // this.props.stores.selectedActiveCardType = object;
                          this.props.todoOnChangeText({ prop: 'priority',value: object })
                          console.log('on comfirm');
                          console.log(object.value);
                          console.log(object.id);
                        }}
                    /> 
                    <View style={todoDateView}>
                        <TouchableOpacity
                            onPress={()=>this.showDateTimePickerFromDate()}
                        >
                            <CommonTextFiledWithIcon
                                freeSizeWidth
                                titleText="Tên người lập biên bản"
                                placeholder="Nhập tên người lập"
                                editable={this.props.isEditable}
                                lineColor={'#1d8468'}
                                image={icName}
                                titleColor={'#1d8468'}
                                onChangeText={this.onChangeReportCreaterName}
                                value={this.props.datetime}
                                errorText={this.props.datetimeError}
                            />
                            <DateTimePicker
                                isVisible={stores.isDateTimePickerVisible}
                                onConfirm={this.handleDateTimePicker.bind(this)}
                                onCancel={this.hideDateTimePicker.bind(this)}
                                maximumDate={maxDateFrom}
                                date={this.props.datetime}
                                cancelTextIOS='HỦY'
                                confirmTextIOS='XÁC NHẬN'
                                titleIOS='Từ ngày'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={bottomView}>
                    <TouchableOpacity style={saveBtn}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
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