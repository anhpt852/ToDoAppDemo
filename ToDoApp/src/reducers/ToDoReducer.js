import {
    TODO_ONCHANGETEXT,
    GET_LIST_TODO,
    GET_LIST_TODO_FAIL,
    GET_LIST_TODO_SUCCESS,
    TODO_CREATE,
    TODO_UPDATE,
    TODO_SETSELECTED_LIST,
    SET_TODO_LIST,
    TODO_REMOVE
  } from '../actions/types';
  import _ from 'lodash';
  import moment from 'moment';
  import {addToDo, updateToDo, removeToDo} from '../commons/Database';
  const INITIAL_STATE = {
    todos: {},
    listToDo: [],
    listSelectedTodo: [],

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
            return { ...state, INITIAL_STATE, listToDo: action.payload};
        case TODO_REMOVE:
            return { ...state, INITIAL_STATE, listToDo: action.payload};
        case GET_LIST_TODO:
            return { ...state, loading: true }
        case GET_LIST_TODO_SUCCESS:
            return { ...state, INITIAL_STATE, todos: action.payload.todos, loading: false, listToDo: action.payload.listToDo};
        case GET_LIST_TODO_FAIL:
            return { ...state, loading: false }
        default:
            return state;
    }
  };