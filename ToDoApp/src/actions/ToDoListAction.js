import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
  Alert
} from 'react-native';
import {
    TODO_UPDATE,
    TODO_CREATE,
    TODO_REMOVE,
    TODO_ONCHANGETEXT,
    TODO_SETSELECTED_LIST,
    GET_LIST_TODO_SUCCESS,
    SET_TODO_LIST,
} from './types';
import _ from 'lodash';
import CF from '../commons/CF'
import moment from 'moment';
import {addToDo, updateToDo, removeToDo} from '../commons/Database';
export const todoOnChangeText = ({ prop, value }) => {
    return {
      type: TODO_ONCHANGETEXT,
      payload: { prop, value }
    };
};

export const setSelectedTodoList = (list) => {
    return {
      type: TODO_SETSELECTED_LIST,
      payload: list
    };
};

export const setTodoList = (list) => {
    return {
      type: SET_TODO_LIST,
      payload: list
    };
};

export const todosFetch = () => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      dispatch({ type: GET_LIST_TODO });
      firebase.database().ref(`/users/${currentUser.uid}/todos`)
        .on('value', snapshot => {
          console.log(snapshot.val());
            const listToDo =_.map(snapshot.val(), (val, uid) => {
                return { ...val, uid };
            });
            console.log(listToDo);
            addToDo(listToDo,
                (isSuccess,object)=>{
                    if (isSuccess) {
                        var newListToDo = [];
                        object.forEach(element => {
                            var newElement = JSON.parse(JSON.stringify(element));
                            newElement.priority = JSON.parse(element.priority);
                            newElement.datetime = moment.utc(element.datetime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
                            if(element.syncStatus !== 'delete') {
                              newListToDo.push(newElement)
                            }
                        });
                        console.log(newListToDo);
                        dispatch({ type: GET_LIST_TODO_SUCCESS, payload: {todos: snapshot.val() ,listToDo: newListToDo} });
                    } else {
                        dispatch({ type: GET_LIST_TODO_SUCCESS, payload: {todos: snapshot.val() ,listToDo: listToDo} });
                    }
                }
            )
        });
    };
};

export const todosCreate = ({ title, content, priority, datetime }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
      CF.checkNetwork((haveNetwork)=>{
        if (haveNetwork) {
          firebase.database().ref(`/users/${currentUser.uid}/todos`)
          .push({ title, content, priority, datetime })
          .then(() => {       
            dispatch({ type: TODO_CREATE});  
            Actions.todoList({ type: 'reset' });
          });
        } else {
          addToDo([{ title, content, priority, datetime, syncStatus: 'create_new', uid: moment(moment(datetime).format('YYYY-MM-DD[T]HH:mm:ss')).valueOf()}],(isSucess,object)=>{
            if(isSucess){
              dispatch({ type: TODO_CREATE});
              Actions.todoList({ type: 'reset' });
            } else {
              Alert.alert('Tạo nhắc việc không thành công');
            }
            
          })
        }
      })
    };
  };

  export const todosUpdate = ({ title, content, priority, datetime, status , uid }) => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      CF.checkNetwork((haveNetwork)=>{
        if (haveNetwork) {
          firebase.database().ref(`/users/${currentUser.uid}/todos/${uid}`)
          .update({ title, content, priority, datetime , status, uid })
          .then(() => {
            updateToDo({ title, content, priority, datetime , status, uid },
              (isSuccess,objects)=>{
                if(isSuccess){
                  var newListToDo = [];
                  objects.forEach(element => {
                      var newElement = JSON.parse(JSON.stringify(element));
                      newElement.priority = JSON.parse(element.priority);
                      newElement.datetime = moment.utc(element.datetime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
                      if(element.syncStatus !== 'delete') {
                        newListToDo.push(newElement)
                      }
                  });
                  dispatch({ type: TODO_UPDATE, payload: newListToDo});
                  Actions.todoList({ type: 'reset' });
                } else {
                  Alert.alert('Cập nhật nhắc việc không thành công');
                }
              })
          });
        } else {
          updateToDo({ title, content, priority, datetime, status, syncStatus: 'edit', uid },(isSucess,objects)=>{
            if(isSucess){
              // Alert.alert('Cập nhật nhắc việc thành công');
              var newListToDo = [];
              objects.forEach(element => {
                  var newElement = JSON.parse(JSON.stringify(element));
                  newElement.priority = JSON.parse(element.priority);
                  newElement.datetime = moment.utc(element.datetime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
                  if(element.syncStatus !== 'delete') {
                    newListToDo.push(newElement)
                  }
              });
              dispatch({ type: TODO_UPDATE, payload: newListToDo});
              Actions.todoList({ type: 'reset' });
            } else {
              Alert.alert('Cập nhật nhắc việc không thành công');
            } 
            
          })
        }
      })
    };
};

export const todosDelete = ({title, content, priority, datetime, status, uid}) => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      CF.checkNetwork((haveNetwork)=>{
        if (haveNetwork) {
          firebase.database().ref(`/users/${currentUser.uid}/todos/${uid}`)
          .remove()
          .then(() => {
            removeToDo(uid,
              (isSuccess,objects)=>{
                if(isSuccess){
                  var newListToDo = [];
                  objects.forEach(element => {
                      var newElement = JSON.parse(JSON.stringify(element));
                      newElement.priority = JSON.parse(element.priority);
                      newElement.datetime = moment.utc(element.datetime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
                      if(element.syncStatus !== 'delete') {
                        newListToDo.push(newElement)
                      }
                  });
                  console.log(newListToDo);
                  
                  dispatch({ type: TODO_REMOVE, payload: newListToDo});
                  Actions.todoList({ type: 'reset' });
                } else {
                  Alert.alert('Xoá nhắc việc không thành công');
                }
              }
            )
          });
        } else {
          updateToDo({ title, content, priority, datetime, status, syncStatus: 'delete', uid },(isSucess,objects)=>{
            if(isSucess){
              // Alert.alert('Cập nhật nhắc việc thành công');
              var newListToDo = [];
              objects.forEach(element => {
                  var newElement = JSON.parse(JSON.stringify(element));
                  newElement.priority = JSON.parse(element.priority);
                  newElement.datetime = moment.utc(element.datetime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
                  if(element.syncStatus !== 'delete') {
                    newListToDo.push(newElement)
                  }
              });
              dispatch({ type: TODO_UPDATE, payload: newListToDo});
              Actions.todoList({ type: 'reset' });
            } else {
              Alert.alert('Cập nhật nhắc việc không thành công');
            } 
            
          })
          // removeToDo(uid ,(isSucess,objects)=>{
          //   if(isSucess){
          //     var newListToDo = [];
          //     objects.forEach(element => {
          //         var newElement = JSON.parse(JSON.stringify(element));
          //         newElement.priority = JSON.parse(element.priority);
          //         newElement.datetime = moment.utc(element.datetime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
          //         newListToDo.push(newElement)
          //     });
          //     dispatch({ type: TODO_REMOVE, payload: newListToDo});
          //     Actions.todoList({ type: 'reset' });
          //   } else {
          //     Alert.alert('Xoá nhắc việc không thành công');
          //   } 
          // })
        }
      })
    };
};