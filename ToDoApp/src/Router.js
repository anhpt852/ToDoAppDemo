import React, { Component } from 'react';
import {Stack,Scene, Router, Actions, Lightbox, Overlay } from 'react-native-router-flux';
import AuthScreen from './containers/AuthScreen/AuthScreen';
import ToDoList from './containers/ToDoList/ToDoList';
import ToDoDetail from './containers/ToDoDetail/ToDoDetail';
import WheelPickerWithObjectInput from './components/TextField/WheelPickerWithObjectInput';
import CF from './commons/CF'
import _ from 'lodash';

class Routes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUserLogin: false
    }
  };

  componentWillMount() {
    console.log('aaaa');
    
    CF.getUserInfo((userInfo)=>{
      if (_.isEmpty(userInfo)) {
        this.setState({isUserLogin:false})
      } else {
        this.setState({isUserLogin:true})
      }
    })
  }

  render(){
    return (
      <Router sceneStyle={{ }}>
        <Overlay key="overlay">
          <Lightbox key="modal" hideNavBar>
            <Stack key="root" hideNavBar>
              
              <Scene key="auth" initial = {!this.state.isUserLogin}>
                <Scene key="login" component={AuthScreen} hideNavBar/>
              </Scene>
  
              <Scene key="main" initial = {this.state.isUserLogin}>
                <Scene
                  onRight={() => Actions.todoDetail()}
                  hideNavBar
                  key="todoList"
                  component={ToDoList}
                />
                <Scene key="todoDetail" component={ToDoDetail} hideNavBar/>
              </Scene>
            </Stack>
            <Scene key="wheelPickerWithObjectInput" component={WheelPickerWithObjectInput} direction='vertical' hideNavBar/>
          </Lightbox>
        </Overlay>
      </Router>
    );
    
  }
  
};

export default Routes;
