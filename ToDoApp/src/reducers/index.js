import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TodoReducer from './ToDoReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,
  todo: TodoReducer,
});
