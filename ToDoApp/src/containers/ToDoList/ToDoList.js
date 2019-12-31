import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from "./ToDoListStyles";
import _ from 'lodash';
import CF from '../../commons/CF'
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import moment from 'moment';
import Navbar from '../../components/NavBar/NavBar'
import { todosFetch, todosDelete, setTodoList, setSelectedTodoList, completedToDo } from '../../actions';
import { SwipeListView } from 'react-native-swipe-list-view';
import ToDoListItem from './ToDoListItem/ToDoListItem';
import {getAllToDo} from '../../commons/Database';
const ic_logout = require('../../images/NavBar/ic_logout.png');
const img_nav_background = require('../../images/NavBar/img_navigation_bar.png');
const ic_add = require('../../images/NavBar/ic_add.png');
const icRemoveCircle = require('../../images/ToDoList/ic_done_circle.png');
const img_empty_list = require('../../images/NavBar/img_empty_list.png');
class ToDoList extends Component {
    
    componentWillMount() {
        CF.checkNetwork((haveNetwork)=>{
            console.log('aaa');
            
            if (haveNetwork) {
                this.props.todosFetch();
            } else {
                getAllToDo((isSuccess,objects)=>{
                    if (objects.length > 0) {
                        var newListToDo = [];
                        objects.forEach(element => {
                            var newElement = JSON.parse(JSON.stringify(element));
                            newElement.priority = JSON.parse(element.priority);
                            newElement.datetime = moment(element.datetime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
                            newListToDo.push(newElement)
                        });
                        this.props.setTodoList(newListToDo)
                    } 
                })
            }
        })
    }

    renderListItem({item}){
        return (
            <ToDoListItem 
                isSelected={item.isSelect}
                item={item} 
                onPress={()=>{Actions.todoDetail({item})}}
                onSelectedItem={()=>{
                    console.log('aaaa');
                    this._onSelectedItem(item)
                }}
            />
        )
    }

    onRightButtonClick(){
        Actions.todoDetail();
    }

    onLeftPressed(){
        CF.logout();
        Actions.auth();
    }

    renderHiddenItem(data, rowMap) {
        const { cellButtonContainer, rightCellButton, rightCellButtonImage } = styles;

        return (
            <View style={cellButtonContainer}>
                <TouchableOpacity onPress={() => {
                    this.onRemove(data.item)
                }} style={rightCellButton}>
                    <Image
                        source={icRemoveCircle}
                        style={rightCellButtonImage}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    onRemove(item){
        this.props.todosDelete({ uid: item.uid});
    }

    _onSelectedItem(item){
        this.props.completedToDo(item);

        var tmpArray = this.props.listSelectedTodo;
        if(!_.find(this.props.listSelectedTodo, item)) {
            tmpArray.push(item)
            this.props.setSelectedTodoList(tmpArray);
        } else {
            tmpArray.splice(_.findIndex(tmpArray, item),1)
            this.props.setSelectedTodoList(tmpArray);
        }

        var tmpArray = [...this.props.listToDo];
        var index = _.findIndex(tmpArray, item);

        item.isSelect = !item.isSelect;
        tmpArray[index] = item;
        console.log( this.props.listSelectedTodo);
        
        this.props.setTodoList(tmpArray);

    }

    render() {
        const {container,flatListContainer, emptyImageContainer , emptyImage} = styles;
        
        return (
            <View style={container}>
                <Navbar
                    backgroundImg={img_nav_background}
                    hasRightBtn
                    hasBackBtn
                    customLeftImg={ic_logout}
                    customRightImg={ic_add}
                    onLeftPressed={this.onLeftPressed}
                    onRightPressed={this.onRightButtonClick}
                    title="Danh sách nhắc việc"
                />
               
                <View style={[flatListContainer,this.props.listToDo.length <= 0 ? {alignItems:'center',justifyContent:'center'} : {} ]}>
                    {this.props.listToDo.length > 0 
                    ? 
                        <SwipeListView
                            useFlatList
                            data={this.props.listToDo}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderListItem.bind(this)}
                            renderHiddenItem={(data, rowMap) => this.renderHiddenItem(data, rowMap)}
                            rightOpenValue={-75}
                            ref={(ref) => this.flatlistref = ref}
                            showsVerticalScrollIndicator={false}
                            disableRightSwipe={true}
                            closeOnRowOpen={true}
                            closeOnRowPress={true}
                        /> 
                    :
                        <TouchableOpacity style={emptyImageContainer} onPress={this.onRightButtonClick.bind(this)}>
                            <Image
                                source={img_empty_list}
                                style={emptyImage}
                                resizeMode={'cover'}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => {
    const {listToDo, listSelectedTodo} = state.todo;
    return { listToDo, listSelectedTodo };
};

AppRegistry.registerComponent('ToDoList', () => ToDoList);
export default connect(mapStateToProps, { todosFetch, todosDelete, setTodoList, setSelectedTodoList , completedToDo}) (ToDoList);
