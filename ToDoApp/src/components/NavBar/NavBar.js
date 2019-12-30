import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import _ from 'lodash';
var closeIcon = require('../../images/NavBar/ic_navbar_close.png');
var backIcon = require('../../images/NavBar/ic_navbar_back.png');
const navBarHeight = Platform.OS === 'ios' ? 64 : 40;
import { Actions } from 'react-native-router-flux';
class NavBar extends Component {

  constructor() {
    super();
    this.onLeftPressed = this.onLeftPressed.bind(this);
    this.onRightPressed = this.onRightPressed.bind(this);
    
  }

  onLeftPressed() {
    console.log('abcccc');
    
    if (this.props.hasBackBtn && !this.props.onLeftPressed) {
      Actions.pop()
    } else {
      this.props.onLeftPressed();
    } 
    
  }

  onRightPressed() {
    if (this.props.hasRightBtn && !this.props.onRightPressed) {
      Actions.pop()
    } else {
      this.props.onRightPressed();
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.backgroundImg && <Image source={this.props.backgroundImg} style={styles.backgroundImage}/>}
        {this.props.hasBackBtn &&
          <TouchableOpacity onPress={this.onLeftPressed} style={styles.backBtn}>
            <Image
              style={styles.imgBack}
              resizeMode={'contain'}
              source={this.props.customLeftImg ? this.props.customLeftImg : backIcon}
            />
          </TouchableOpacity>}

        <View style={styles.textContainer}>
          {
            this.props.isTwoLineTitle === false
              ? <Text style={[styles.title]}> {this.props.title} </Text>
              : <View>
                <Text style={styles.title}> {this.props.title} </Text>
                <Text style={styles.subtitle}> {this.props.subtitle} </Text>
              </View>
          }
        </View>

        {this.props.hasRightBtn && 
          <TouchableOpacity onPress={this.onRightPressed} style={styles.closeBtn}>
          { this.props.customRightImg  ?
            <Image
              style={styles.imgBack}
              resizeMode={'contain'}
              source={this.props.customRightImg ? this.props.customRightImg : closeIcon}
            /> : (!_.isNil(this.props.textRight) && this.props.textRight.length > 0)  && 
            <Text style={styles.textRightStyles}>
                {this.props.textRight}
            </Text>
          }
          </TouchableOpacity>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...ifIphoneX({
      height: 88,
    }, {
        height: 64,
      }),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...ifIphoneX({
      paddingTop: 44
    }, {
        ...Platform.select({
          ios: {
            paddingTop: 20,
          },
          android: {
            paddingTop: 0
          },
        }),
      }),
  },
  backgroundImage:{
    position:'absolute',
    top:0,
    left:0,
    width: '100%',
    ...ifIphoneX({
      height: 88,
    }, {
        height: 64,
      }),
  },
  textContainer: {
    ...ifIphoneX({
      top: 44,
      height: 44,
    }, {
        ...Platform.select({
          ios: {
            height: 44,
            top: 20,
          },
          android: {
            top: 10,
            height: 64,
          },
        }),
      }),

    position: 'absolute',
    left: 60,
    right: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'white'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    alignSelf: 'center',
  },
  imgIcon: {
    width: 33,
    marginTop: 20
  },
  imgIconRight: {
    width: 22,
    marginRight: 15,
  },
  imgBack: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },

  backBtn: {
    position: 'absolute',
    left: 15,
    ...ifIphoneX({
      top: 44
    }, {
        ...Platform.select({
          ios: {
            top: 25
          },
        }),
      }),
  },

  closeBtn: {
    position: 'absolute',
    right: 15,
    ...ifIphoneX({
      top: 44
    }, {
        ...Platform.select({
          ios: {
            top: 25
          },
        }),
      }),
  },

  textRightStyles: {
    // width: 60,
    color: '#39A84D',
    marginTop: 25,
    marginBottom: 17,
    ...Platform.select({
          ios: {
            marginTop: 30,
            marginBottom: 10,
          },
        }),
  }
});

AppRegistry.registerComponent('NavBar', () => NavBar);
export default NavBar;

