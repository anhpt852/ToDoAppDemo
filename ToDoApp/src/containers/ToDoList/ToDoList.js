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
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import Navbar from '../../components/NavBar/NavBar'
import { todosFetch } from '../../actions';
import ToDoListItem from './ToDoListItem/ToDoListItem';
const img_nav_background = require('../../images/NavBar/img_navigation_bar.png');
const ic_add = require('../../images/NavBar/ic_add.png');
const img_empty_list = require('../../images/NavBar/img_empty_list.png');
class ToDoList extends Component {
    componentWillMount() {
        this.props.todosFetch();
    }

    renderListItem({item}){
        console.log(item);
        
        return (<ToDoListItem onOpenDetailToDo={()=>{this.onOpenDetailToDo(item)}} item={item}/>)
    }

    onRightButtonClick(){
        Actions.todoDetail();
    }

    render() {
        const {container,flatListContainer, emptyImageContainer , emptyImage} = styles;

        return (
            <View style={container}>
                <Navbar
                    backgroundImg={img_nav_background}
                    hasRightBtn
                    customRightImg={ic_add}
                    onRightPressed={this.onRightButtonClick}
                    title="Danh sách nhắc việc"
                />
                <View style={[flatListContainer,this.props.todos.length <= 0 ? {alignItems:'center',justifyContent:'center'} : {} ]}>
                    {this.props.todos.length > 0 
                    ? 
                        <FlatList
                            data={this.props.todos}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderListItem}
                            // ListHeaderComponent={this.renderReportListHeader}
                            showsVerticalScrollIndicator={false}
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
    const todos = _.map(state.todo.listToDo, (val, uid) => {
        return { ...val, uid };
      });
    
      console.log(todos);
      
      return { todos };
};

AppRegistry.registerComponent('ToDoList', () => ToDoList);
export default connect(mapStateToProps, { todosFetch }) (ToDoList);
