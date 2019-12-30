import React from 'react';
import {Stack,Scene, Router, Actions, Lightbox, Overlay } from 'react-native-router-flux';
import AuthScreen from './containers/AuthScreen/AuthScreen';
import ToDoList from './containers/ToDoList/ToDoList';
import ToDoDetail from './containers/ToDoDetail/ToDoDetail';
import WheelPickerWithObjectInput from './components/TextField/WheelPickerWithObjectInput';
import CF from './commons/CF'



const RouterComponent = () => {
  return (
    <Router sceneStyle={{ }}>
      <Overlay key="overlay">
        <Lightbox key="modal" hideNavBar>
          <Stack key="root" hideNavBar>
            
            <Scene key="auth">
              <Scene key="login" component={AuthScreen} initial = {true}  hideNavBar/>
            </Scene>

            <Scene key="main">
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
};

export default RouterComponent;
