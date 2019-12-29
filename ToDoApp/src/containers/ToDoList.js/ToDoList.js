import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from "./ToDoListStyles";
import { connect } from 'react-redux';
import { todosFetch } from '../actions';
class ToDoList extends Component {
    componentWillMount() {
        this.props.todosFetch();
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
                <View style={topContainer}>
                    
                </View>
                
                <View style={flatListContainer}>
                    <FlatList
                        data={stores.listReportObjects}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderReportListItem}
                        ListHeaderComponent={this.renderReportListHeader}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => {
    
};

AppRegistry.registerComponent('ToDoList', () => ToDoList);
export default connect(mapStateToProps, { todosFetch }) (ToDoList);
