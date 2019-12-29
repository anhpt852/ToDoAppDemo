import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  View
} from 'react-native';
import styles from "./ToDoListStyles";
import { connect } from 'react-redux';
import Navbar from '../../components/NavBar/NavBar'
import { todosFetch } from '../actions';
import ToDoListItem from './ToDoListItem/ToDoListItem';
class ToDoList extends Component {
    componentWillMount() {
        this.props.todosFetch();
    }

    renderListItem(item){
        return <ToDoListItem/>
    }

    render() {
        const {container,flatListContainer, topContainer } = styles;

        return (
            <View style={container}>
                <Navbar
                    hasBackBtn
                    backgroundImg={img_nav_background}
                    customLeftImg={ic_menu}
                    onLeftPressed={this.onOpenMenu}
                    hasRightBtn
                    customRightImg={ic_shutdown}
                    onRightPressed={this.onRightButtonClick}
                    title="Biên Bản"
                />
 
                <View style={flatListContainer}>
                    <FlatList
                        data={stores.listReportObjects}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderListItem}
                        // ListHeaderComponent={this.renderReportListHeader}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => {
    const todos = _.map(state.todo.listToDo, (val, uid) => {
        return { ...val, uid };
      });
    
      return { todos };
};

AppRegistry.registerComponent('ToDoList', () => ToDoList);
export default connect(mapStateToProps, { todosFetch }) (ToDoList);
