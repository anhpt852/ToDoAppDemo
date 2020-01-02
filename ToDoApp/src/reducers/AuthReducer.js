import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTH_MODE_CHANGED,
  SHOW_LOADING,
  HIDE_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  errorEmail: '',
  password: '',
  passwordError: '',
  user: null,
  loading: false,
  isLogin: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return  {...state, loading: true}
    case HIDE_LOADING:
      return  {...state, loading: false}
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case AUTH_MODE_CHANGED:
      return { ...state, isLogin: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true};
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload  ,loading: false};
    case LOGIN_USER_FAIL:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
