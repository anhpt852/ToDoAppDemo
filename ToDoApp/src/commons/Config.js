// quản lý version của app =>>>> cái này cực kỳ quan trọng trong mỗi lần đẩy app nên ae lưu ý nhé
// anh em lưu ý là khi up app lên store thành công thì tiến hành bảo server nâng
// version + lastestVersion lên 1 và update lại trường forcedUpdate=true với toàn bộ các
// version trước đó để bắt user dùng những version trước đó phải update lên bản mới nhất
// trên store

/* release 15/5/2018
 "version": 1,
 "latestVersion": 1,
 "forcedUpdate": false,
*/

import {
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

module.exports = {
  ServiceUrl: 'http://118.70.171.10:8443/csgtapi/',
  ImageUrl: 'http://118.70.171.10:8443/csgtapi',
  version: 1,
  versionName: '1.0.0',
  builđAndroid: '53',
  buildiOS: '38',

  DatabaseKey: '9B96A1FE1D548CBBC960CC6A0286668FD74A763667B06366FB2324269FCABAA4',
  RequestTimeOut: 60000,

  ColorDarkGreen: '#00D160', // dark green
  ColorLightGreen: '#00EC59', // light green
  ColorWhite: '#FFF', // white
  ColorLineGray: '#f1f3f8',

  ColorBackgroundButtonGreen: '#01ad52',

  ColorTextGray: '#22242a', // gray
  ColorTextGrayPlaceHolder: '#C9C9C9', // graycd ,.
  ColorTextRed: '#FF424C', // red
  ColorTextBlack: '#000000', // black

};

