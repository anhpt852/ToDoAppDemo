import {
  AsyncStorage,
  Platform
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
// import {
//   NavigationActions
// } from '../containers/NavigationActionsClass'
import numeral from 'numeral';
import moment from 'moment';
import Config from '../commons/Config';


// format lại text dạng số sang dạng tiền
function formatMoneyText(str){
  return (numeral(parseFloat(str)).format('0,0') + ' VND').toString().replace(/,/g,'.')
}

//  kiểm tra tình trạng mạng có hay chưa
function checkNetwork(callback){
  NetInfo.fetch().then((connectionInfo) => {
    if(connectionInfo.type === 'none'){
      callback(false);
    } else {
      callback(true);
    }
  });
}

// kiểm tra engine nhận dạng có available hay không

async function checkVoiceRecogitionAvailable(callback){
  
  if(Platform.OS === "android"){
    let list = await Voice.getSpeechRecognitionServices();
    let isAvail = Voice.isAvailable();
    console.log('here',list);
    if (list.length > 0 && isAvail) {
      if(list.indexOf("com.google.android.googlequicksearchbox") > -1){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  } else {
    callback(true);
  }
}


// Xử lý đọc và ghi thông tin local
function readData(key, callback) {
  AsyncStorage.getItem(key)
    .then((response) => {
      callback(response);
    });
}

function writeData(key, value) {
  if (value) {
    AsyncStorage.setItem(key, value);
  }
}

//Lấy thông tin access token
function getAccessToken(callback) {
  AsyncStorage.getItem('accessToken')
    .then((response) => {
      callback(response);
    });
}

// Lấy thông tin username
function getUserName(callback) {
  AsyncStorage.getItem('userName')
    .then((response) => {
      callback(response);
    });
}

// Lấy thông tin user đang login
function getUserInfo(callback) {
  AsyncStorage.getItem('userinfo')
    .then((response) => {
      callback(JSON.parse(response))
    });
}

// Lưu thông tin username
function setUserName(userName) {
  AsyncStorage.setItem('userName', userName);
}

// Lưu thông tin accesstoken
function setAccessToken(token) {
  AsyncStorage.setItem('accessToken', token);
}

// Lưu thông tin userinfo
function setUserInfo(object) {
  AsyncStorage.setItem('userinfo', JSON.stringify(object));
}

function setDiaDiemViPham (diadiemvipham){
  AsyncStorage.setItem('diadiemvipham', diadiemvipham);
}

function getDiaDiemViPham (callback){
  AsyncStorage.getItem('diadiemvipham')
  .then((response) => {
    callback(response);
  });
}

// Validate text ứng với từng dạng thông tin 
function validateUsername(values) {
  var values = values.trim();
  const regex = '^([a-zA-Z0-9!#$%&’*+/=?^_{|}~-]+(?:\\.[a-zA-Z0-9!#$%&’*+/=?^_{|}~-]+)*@[a-zA-Z0-9-]' +
    '+(?:\\.[a-zA-Z0-9-]+)+|[0-9]{9,11})$';
  if (!values || !new RegExp(regex, 'i').test(values)) {
    return true;
  }
  return false;

}

function validateFullname(values) {
  var values = values.trim();
  var regex = /^[a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ]+$/g;
  if (!regex.test(values)) {
    return true;
  }
  return false;
}

function validateCMND(values) {
  var values = values.trim();
  var regex = /^[0-9]+$/g;
  if (!regex.test(values)) {
    return true;
  }
  return false;
}

function validateCMNDQD(values) {
  var values = values.trim();
  var regex = /^[0-9a-zA-Z]+$/g;
  if (!regex.test(values)) {
    return true;
  }
  return false;
}

function validateEmail(values) {
  var values = values.trim();
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(values)) {
    return true;
  }
  return false;
}

function validatePhoneNumber(values) {
  var values = values.trim();
  var regex = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/;

  if (!regex.test(values)) {
    return true;
  }
  return false;
}

function validatePassword(values) {
  // var values = values.trim();

  var regex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#?*$%\\^\\&\\+\\-=])(?=.{6,20})');
  if (!regex.test(values)) {
    return true;
  }
  return false;
}

function capitalizeFirstLetter(string) {
  return string.toLowerCase().split(' ').map(
    x => x.charAt(0).toUpperCase() + x.slice(1)
  ).join(' ');
}

// Xử lý để refresh data sau mỗi 5p
function startCountDown(){
  mainStores.startCountDown()
}

function stopCountDown(){
  mainStores.stopCountDown();
}

// logout
function logout(){
  this.setUserInfo({});
}

exports.readData = readData;
exports.writeData = writeData;
exports.getAccessToken = getAccessToken;
exports.setAccessToken = setAccessToken;
exports.validateUsername = validateUsername;
exports.validatePassword = validatePassword;
exports.validateEmail = validateEmail;
exports.validatePhoneNumber = validatePhoneNumber;
exports.validateFullname = validateFullname;
exports.validateCMND = validateCMND;
exports.validateCMNDQD = validateCMNDQD;
exports.getUserName = getUserName;
exports.setUserName = setUserName;
exports.setDiaDiemViPham = setDiaDiemViPham;
exports.getDiaDiemViPham = getDiaDiemViPham;
exports.setUserInfo = setUserInfo;
exports.getUserInfo = getUserInfo;
exports.logout = logout;
exports.formatMoneyText = formatMoneyText;
exports.startCountDown = startCountDown;
exports.stopCountDown = stopCountDown;
exports.checkNetwork = checkNetwork;
exports.checkVoiceRecogitionAvailable = checkVoiceRecogitionAvailable;