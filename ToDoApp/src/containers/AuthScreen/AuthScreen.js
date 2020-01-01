import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Alert,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';

import _ from 'lodash';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser,registerUser ,authModeChanged } from '../../actions';
import Loader from '../../components/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonTextField from '../../components/TextField/CommonTextField';
import PasswordTextField from '../../components/TextField/PasswordTextField';
import styles from "./AuthScreenStyles"
import {Actions} from 'react-native-router-flux';
import icUsename from '../../images/Login/ic_at.png';
import icPassword from '../../images/Login/ic_lock.png';
import icLook from '../../images/Login/ic_eye.png';
import icLogo from '../../images/Common/ic_logo.png';

class AuthScreen extends Component {

  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
  }

  actionClick() {
    const { email, password } = this.props;
    if (this.props.isLogin ) {
      this.props.loginUser({ email, password });
    } else {
      this.props.registerUser({ email, password });
    }
  }


  onClickBack() {
    Actions.pop();
  }

  render() {
    const { container, content, topContainer, imageLogo,
      textTitle, textContent, usernamePasswordView, loginButton,
      headerContainer, headerTitle, headerSubtitle,
      scrollView, loginButtonText, btnRegister, registerText, forgotPassInline} = styles;

    return (
      <View style={container}>
        <Loader
          onRequestClose={this.onRequestClose}
          loading={this.props.loading} />
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={(Platform.OS === 'ios')}
          contentContainerStyle={scrollView}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}>
          <View
            style={content}>
            <View
              style={topContainer}>
              <Image source={icLogo} style={imageLogo} resizeMode={'contain'}/>
              <Text style={textTitle}>To do</Text>
              <Text style={textContent}>Remind everything for you</Text>
            </View>

            <View style={usernamePasswordView}>
              <View style={headerContainer}>
                <Text style={headerTitle}>Chào mừng</Text>
                <Text style={headerSubtitle}>{this.props.isLogin ? 'Đăng nhập' : 'Đăng kí'}</Text>
              </View>
              <CommonTextField name="username"
                placeholder='Nhập email'
                onChangeText={(value) => this.props.emailChanged(value)}
                errorText={this.props.errorEmail}
                value={this.props.email}
                image={icUsename}
              />
              <PasswordTextField name="password"
                titleText='MẬT KHẨU' 
                placeholder='Nhập mật khẩu'
                onChangeText={(value) => this.props.passwordChanged(value)}
                errorText={this.props.passwordError}
                image={icPassword}
                imageLook={icLook}
              />
            </View>
            <TouchableOpacity
              onPress={this.actionClick.bind(this)}>
              <View style={loginButton}>
                <Text style={[loginButtonText]}>
                {this.props.isLogin ? 'Đăng nhập' : 'Đăng kí'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.props.authModeChanged(!this.props.isLogin)}
              style={btnRegister}
            >
              {this.props.isLogin ? 
              <Text style={registerText}>
                Chưa có tài khoản? <Text style={forgotPassInline}>Đăng kí</Text>
              </Text>
              :
              <Text style={forgotPassInline}>
                Quay lại đăng nhập 
              </Text>}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        {/* </TouchableWithoutFeedback> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { email, errorEmail,  password, passwordError, loading, isLogin} = state.auth;

  return { email, errorEmail,  password, passwordError, loading, isLogin};
};

AppRegistry.registerComponent('AuthScreen', () => AuthScreen);
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser,registerUser ,authModeChanged }) (AuthScreen);