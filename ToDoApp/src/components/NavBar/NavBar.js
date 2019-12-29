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
var closeIcon = require('../../images/NavBar/close.png');
var backIcon = require('../../images/NavBar/back.png');
const navBarHeight = Platform.OS === 'ios' ? 64 : 40;
import { Navigation } from 'react-native-navigation';
class NavBar extends Component {

  constructor() {
    super();
    this.onLeftPressed = this.onLeftPressed.bind(this);
    this.onRightPressed = this.onRightPressed.bind(this);
    
  }

  onLeftPressed() {
    console.log('abcccc');
    
    if (this.props.hasBackBtn && !this.props.onLeftPressed) {
      Navigation.pop(this.props.componentId)
    } else {
      this.props.onLeftPressed();
    } 
    
  }

  onRightPressed() {
    if (this.props.hasRightBtn && !this.props.onRightPressed) {
      Navigation.dismissModal(this.props.componentId)
    } else {
      this.props.onRightPressed();
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
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
  textContainer: {
    ...ifIphoneX({
      top: 44,
      height: 44,
    }, {
        ...Platform.select({       
          ios: {
            height: 44,
            top: 10,
          },
          android: {
            height: 64,
            top: 10,
          },
        }),
      }),
    
    position: 'absolute',
    left: 60,
    right: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  text: {
    color: '#161F3D',
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
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 20,
    fontFamily:'Helvetica-Bold',
    color: '#161F3D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
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
            top: 20
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
            top: 20
          },
        }),
      }),
  },

  textRightStyles: {
    // width: 60,
    fontSize: 17,
    color: '#F93963',
    ...ifIphoneX({
      height: 44,
    }, {
        ...Platform.select({
          ios: {
            top: 6,
            height: 44,
          },
          android: {
            
          },
        }),
      }),
  }
});

AppRegistry.registerComponent('NavBar', () => NavBar);
export default NavBar;

