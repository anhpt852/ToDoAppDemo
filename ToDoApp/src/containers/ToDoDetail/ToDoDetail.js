import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from "./TodoDetailStyles";
import { connect } from 'react-redux';
import { todoOnChangeText, todosCreate, todosUpdate, todosDelete } from '../actions';
class ToDoDetail extends Component {
    render() {
        const {container,topView, middleView, bottomView, saveBtn } = styles;
        return (
            <View style={container}>
                <View style={topView}>
                    <View style={{width:"100%"}}>
                        <Text style={{ color: '#555555', fontSize: 18, fontFamily:'OpenSans-Bold', marginBottom: 10}}>
                                Ý kiến người vi phạm
                        </Text>
                        <CommonTextField
                            fontSize= {18}
                            freeSizeWidth
                            placeholder="Nhập ý kiến"
                            onChangeText={this.onChangeYKien}
                            editable={this.props.isEditable === true ? this.state.editable : this.props.isEditable}
                            titleColor={'#1d8468'}
                            multiline={true}
                            numberOfLines={4}
                            height={Platform.OS === 'android' ? 0 : 80}
                            selectable={true}
                            value={this.props.stores.violateSubjectOpinion}
                            errorText={this.props.stores.violateSubjectOpinionErrorText}
                        />
                    </View>
                </View>
                <View style={middleView}>
                    <CommonTextFiledWithIcon
                        freeSizeWidth
                        titleText="Tên người lập biên bản"
                        placeholder="Nhập tên người lập"
                        editable={this.props.isEditable}
                        lineColor={'#1d8468'}
                        image={icName}
                        titleColor={'#1d8468'}
                        onChangeText={this.onChangeReportCreaterName}
                        value={this.props.stores.reportCreaterName}
                        errorText={this.props.stores.reportCreaterNameErrorText}
                    />
                    <CommonTextFiledWithIcon
                        freeSizeWidth
                        titleText="Cấp bậc"
                        placeholder="Nhập cấp bậc"
                        image={icRank}
                        editable={this.props.isEditable}
                        lineColor={'#1d8468'}
                        titleColor={'#1d8468'}
                        onChangeText={this.onChangeRank}
                        value={this.props.stores.rank}
                        errorText={this.props.stores.rankErrorText}
                    />
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
    
};

AppRegistry.registerComponent('ToDoDetail', () => ToDoDetail);
export default connect(mapStateToProps, {  }) (ToDoDetail)