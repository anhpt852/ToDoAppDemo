import {
    StyleSheet,
    Dimensions,
    Platform
  } from "react-native"
  import Config from '../../commons/Config';
  const { width, height } = Dimensions.get('window');
  import { ifIphoneX } from 'react-native-iphone-x-helper';
  
  export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
  
    content: {
      justifyContent: 'center',
      alignItems: 'center',
      width,
      // backgroundColor: '#18C4BA',
    },
  
    scrollView: {
      flex: 1,
    },
  
    topContainer: {
      width,
      height: height / 3,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#18C4BA',
      height: 294,
      width: '100%',
      paddingBottom: -40,
      ...ifIphoneX({
        paddingTop: 44
      }, {
        paddingTop: 20
        }),
    },
  
    imageLogo: {
      width: 100,
      height: 100,
      // marginBottom: -69
    },
  
    textTitle:{
      color:'#ffffff',
      fontFamily:'Helvetica Neue',
      fontSize: 25,
      marginTop: 20,
      marginBottom: 8,
      fontWeight: 'bold',
    },
  
    textContent:{
      color:'#ffffff',
      fontFamily:'Helvetica Neue',
      fontSize: 17,
      fontWeight: '600',
    },
  
    titleLeftTextContainer: {
      color: '#00D160',
      fontSize: 40,
      paddingTop: 30,
      fontWeight: 'bold'
    },
  
    titleRightText: {
      color: Config.ColorLightGreen,
    },
  
    headerContainer:{
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    headerTitle:{
      fontSize: 35,
      fontFamily:'Helvetica Neue',
    },
  
    headerSubtitle:{
      fontFamily:'Helvetica Neue',
      fontSize: 18,
      marginTop: 10,
      marginBottom: 40,
      color: '#96969A',
    },
  
    usernamePasswordView: {
      paddingBottom: 0,
      paddingTop:20,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderWidth: 1,
      borderColor: '#ffffff',
      backgroundColor: '#ffffff'
    },
  
    loginButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F93963',
      borderRadius: 23,
      marginBottom: 8,
      marginRight: 40,
      marginLeft: 40,
      marginTop: 8,
      height: 46,
      width: (width - 80)
    },
  
    viewBottom: {
      position: 'absolute',
      top: (height - 120),
      width: '100%',
      height: 100,
      // backgroundColor: 'red'
    },
  
    loginButtonText: {
      color: 'white',
      fontFamily:'Helvetica Neue',
    },
  
    registerView: {
      paddingTop: 20,
    },
    registerButton: {
  
    },
    registerTextLeftContainer: {
      color: '#7D8397'
    },
    registerTextRight: {
      color: Config.ColorDarkGreen,
    },
  
    backButton: {
  
    },
  
    backButtonView: {
      width,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    backIcon: {
      width: 25,
      height: 25
    },
  
    backText: {
      fontSize: 13,
      color: '#4a4a4a',
      marginTop: 12
    },
  
    forgotPass: {
      fontSize: 18,
      color: '#26315F',
      fontFamily:'Helvetica Neue',
      // paddingBottom: 100
    },
  
    btnForgotPass :{
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
  
    btnRegister:{
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    forgotPassInline: {
      fontSize: 18,
      color: '#F93963',
      fontFamily:'Helvetica Neue',
    },
  
    socialButtonContainer:{
      height: 44,
      flexDirection: 'row',
      width,
      justifyContent: 'center',
      marginTop: 10,
    },
  
    fbButtonContainer:{
      marginRight: 60,
    },
  
    fbButtonImage:{
  
    },
  
    ggButtonContainer:{
  
    },
  
    ggButtonImage:{
  
    },
  
    registerText: {
      fontSize: 18,
      color:'#97979B',
      fontFamily:'Helvetica Neue',
    }
  
  });