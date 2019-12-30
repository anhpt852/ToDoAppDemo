import {
    TODO_ONCHANGETEXT,
    GET_LIST_TODO_SUCCESS,
    TODO_CREATE,
    TODO_UPDATE,
    TODO_SETSELECTED_LIST,
    SET_TODO_LIST
  } from '../actions/types';
  import _ from 'lodash';
  const INITIAL_STATE = {
    todos: {},
    listToDo: [],
    listSelectedTodo: [],
    currentSelectedToDo: {},
    title: '', 
    titleError: '', 
    content: '',
    contentError: '',
    priority: {
        id: 1,
        value: 'Cao',
    },
    priorityError: '',
    datetime: new Date(),
    datetimeText: '',
    datetimeError: '',
    error: '',
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TODO_ONCHANGETEXT:
            return { ...state, [action.payload.prop]: action.payload.value };
        case TODO_SETSELECTED_LIST:
            return { ...state, listSelectedTodo: action.payload };
        case SET_TODO_LIST:
            return { ...state, listToDo: action.payload };
        case TODO_CREATE:
            return INITIAL_STATE;
        case TODO_UPDATE:
            return INITIAL_STATE;
        case GET_LIST_TODO_SUCCESS:
            const listToDo =_.map(action.payload, (val, uid) => {
                return { ...val, uid };
            });
            return { ...state, error: INITIAL_STATE, todos: action.payload, listToDo};
        default:
            return state;
    }
  };