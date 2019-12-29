import {
    GET_LIST_TODO,
    GET_LIST_TODO_SUCCESS,
    GET_LIST_TODO_FAIL
  } from '../actions/types';
  
  const INITIAL_STATE = {
    listToDo: [],
    currentSelectedToDo: {},
    title: '', 
    content: '', 
    datetime: '',
    error: '',
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TODO_ONCHANGETEXT:
            return { ...state, [action.payload.prop]: action.payload.value };
        case TODO_CREATE:
            return INITIAL_STATE;
        case TODO_UPDATE:
            return INITIAL_STATE;
        case GET_LIST_TODO_SUCCESS:
            return { ...state, error: INITIAL_STATE, listToDo: action.payload };
        default:
            return state;
    }
  };