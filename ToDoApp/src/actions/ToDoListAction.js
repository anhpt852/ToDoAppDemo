import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
    TODO_UPDATE,
    TODO_CREATE,
    TODO_ONCHANGETEXT,
    GET_LIST_TODO_SUCCESS,

} from './types';

export const todoOnChangeText = ({ prop, value }) => {
    return {
      type: TODO_ONCHANGETEXT,
      payload: { prop, value }
    };
};

  
export const todosFetch = () => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/todos`)
        .on('value', snapshot => {
            dispatch({ type: GET_LIST_TODO_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const todosCreate = ({ title, content, priority, datetime }) => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/todos`)
        .push({ title, content, priority, datetime })
        .then(() => {
            console.log('aaaa');
            
            dispatch({ type: TODO_CREATE });
            Actions.todoList({ type: 'reset' });
        });
    };
};

export const todosUpdate = ({ title, content, priority, datetime , uid }) => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/todos/${uid}`)
        .set({ title, content, priority, datetime })
        .then(() => {
            dispatch({ type: TODO_UPDATE });
            Actions.todoList({ type: 'reset' });
        });
    };
};
  
export const todosDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();
  
    return () => {
      firebase.database().ref(`/users/${currentUser.uid}/todos/${uid}`)
        .remove()
        .then(() => {
            Actions.todoList({ type: 'reset' });
        });
    };
};