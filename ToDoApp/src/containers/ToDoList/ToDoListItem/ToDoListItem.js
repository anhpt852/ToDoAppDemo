import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native';
import styles from "./ToDoListItemStyles"
import moment from 'moment';
const icTickbox = require('../../../images/ToDoList/ic_tickbox_selected.png');
const icTickboxUnselected = require('../../../images/ToDoList/ic_tickbox_unselected.png');
import { connect } from 'react-redux';
class ToDoListItem extends Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.onSelectedItem = this.onSelectedItem.bind(this);
    }

    onPress(){
        this.props.onPress();
    }

    onSelectedItem(){
        
        this.props.onSelectedItem();
    }

    render() {
        const {container, cellBackground, selectIconContainer,selectIcon , leftContent, titleText, contentText, timeText, bottomLine} = styles;

        var cellBackgroundStyles = [cellBackground,{backgroundColor:'#FFFFFF'}]
        var titleTextStyle = titleText
        var contentTextStyle = contentText
        var timeTextStyle = timeText
        var selectIconStyle = selectIcon
    
        if (this.props.item.priority.id === 1) {
            // cellBackgroundStyles = [cellBackground,{backgroundColor:'#FFAE9F'}]
            titleTextStyle = [titleText,{color:'#ED1B24'}]
            contentTextStyle = [contentText,{color:'#ED1B24'}]
            timeTextStyle = [timeText,{color:'#ED1B24'}]
            selectIconStyle = [selectIcon,{tintColor:'#ED1B24'}]
        } else if(this.props.item.priority.id === 2){
            // cellBackgroundStyles = [cellBackground,{backgroundColor:'#FDFFD8'}]
            titleTextStyle = [titleText,{color:'#ECAF61'}]
            contentTextStyle = [contentText,{color:'#ECAF61'}]
            timeTextStyle = [timeText,{color:'#ECAF61'}]
            selectIconStyle = [selectIcon,{tintColor:'#ECAF61'}]
        }
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.onPress} style={container}>
                <Image style={cellBackgroundStyles}/>
                <TouchableOpacity style={selectIconContainer} onPress={this.onSelectedItem}>
                    <Image
                        style={selectIconStyle}
                        source={this.props.isSelected ? icTickbox : icTickboxUnselected}
                    />
                </TouchableOpacity>
                <View style={leftContent}>
                    <Text numberOfLines={1} style={titleTextStyle}>
                        {this.props.item.title}
                    </Text>
                    <Text numberOfLines={2} style={contentTextStyle}>
                        {this.props.item.content}
                    </Text>
                </View>
                <View style={{flex: 1}}/>
                <Text style={timeTextStyle}>
                    {moment.utc(this.props.item.datetime,"YYYY-MM-DD[T]HH:mm:ss[Z]").local().fromNow(false)}
                </Text>
                <View style={bottomLine}/>
            </TouchableOpacity>
        );
    }
}



AppRegistry.registerComponent('ToDoListItem', () => ToDoListItem);
export default ToDoListItem;
