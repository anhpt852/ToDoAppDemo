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
import { emailChanged, passwordChanged, loginUser } from '../actions';
import Loader from '../../../components/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonTextField from '../../../components/TextField/CommonTextField';
import PasswordTextField from '../../../components/TextField/PasswordTextField';
import styleMain from '../../../styles/styles';
import styles from "./LoginStyles"

import icUsename from '../../../images/Login/ic_at.png';
import icPassword from '../../../images/Login/ic_lock.png';
import icLook from '../../../images/Login/ic_eye.png';
import icLogo from '../../../images/Login/ic_logo.png';

class LoginScreen extends Component {

  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
  }

  actionClick() {
    stores.onLoginEmail();
  }


  onClickBack() {
    Navigation.pop(this.props.componentId);
  }

  render() {
    const { container, content, topContainer, imageLogo,
      textTitle, textContent, usernamePasswordView, loginButton,
      headerContainer, headerTitle, headerSubtitle,
      scrollView, loginButtonText } = styles;

    const { largeText } = styleMain;

    return (
      <View style={container}>
        <Loader
          onRequestClose={this.onRequestClose}
          loading={stores.loading} />
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
        <KeyboardAwareScrollView
          contentContainerStyle={scrollView}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}>
          <View
            style={content}>
            <View
              style={topContainer}>
              <Image source={icLogo} style={imageLogo} resizeMode={'contain'}/>
              <Text style={textTitle}>To do</Text>
              <Text style={textContent}>Let me remember for you</Text>
            </View>

            <View style={usernamePasswordView}>
              <View style={headerContainer}>
                <Text style={headerTitle}>Chào mừng</Text>
                <Text style={headerSubtitle}>Đăng nhập</Text>
              </View>
              <CommonTextField name="username"
                placeholder='Nhập email'
                onChangeText={this.onChangeText.bind(this)}
                errorText={stores.errorUsername}
                value={stores.username}
                image={icUsename}
              />
              <PasswordTextField name="password"
                titleText='MẬT KHẨU' 
                placeholder='Nhập mật khẩu'
                onChangeText={this.onChangeText.bind(this)}
                errorText={stores.errorPassword}
                image={icPassword}
                imageLook={icLook}
              />
            </View>

            <TouchableOpacity
              onPress={this.actionClick.bind(this)}>
              <View style={loginButton}>
                <Text style={[largeText, loginButtonText]}>
                  Đăng nhập
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        {/* </TouchableWithoutFeedback> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
    
};

AppRegistry.registerComponent('AuthScreen', () => AuthScreen);
export default connect(mapStateToProps, {  }) (AuthScreen);