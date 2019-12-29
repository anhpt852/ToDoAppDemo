import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TodoReducer from './ToDoReducer';

export default combineReducers({
  auth: AuthReducer,
  todo: TodoReducer,
});
