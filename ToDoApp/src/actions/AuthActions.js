import {
  Alert,
} from "react-native"
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {removeAll} from '../commons/Database';
import CF from '../commons/CF'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTH_MODE_CHANGED
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const authModeChanged = (isLogin) => {
  return {
    type: AUTH_MODE_CHANGED,
    payload: isLogin
  };
};


export const registerUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    console.log('here');
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch((error) => loginUserFail(dispatch,error.message));
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
        Alert.alert(
          'Có lỗi xảy ra',
          'Đăng nhập thất bại. Sai mật khẩu hoặc tài khoản chưa tồn tại. Bạn có muốn tạo tài khoản mới?',
          [
            {
              text: 'Cancel',
              onPress: () => {
                loginUserFail(dispatch, error.message)
            },
              style: 'cancel',
            },
            {text: 'OK', onPress:()=> {
                 firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => loginUserSuccess(dispatch, user))
                .catch(() => loginUserFail(dispatch,'Tạo tài khoản mới không thành công'));
            }}
          ],
          {cancelable: false},
        );
      });
  };
};

const loginUserFail = (dispatch, errorText) => {
  // 
  Alert.alert(
    'Có lỗi xảy ra',
    errorText,
    [
      {
        text: 'Cancel',
        onPress: () => {
          dispatch({ type: LOGIN_USER_FAIL ,payload: errorText});
      },
        style: 'cancel',
      },
    ],
    {cancelable: false},
  );
  
};

const loginUserSuccess = (dispatch, user) => {
  CF.setUserInfo(user);
  removeAll();
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};
