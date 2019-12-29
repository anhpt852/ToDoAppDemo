import React from 'react';
import {Stack, Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
  CF.getAccessToken((token) => {
    return (
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key="root">
          <Scene key="auth">
            <Scene key="login" component={LoginForm} title="Please Login" initial = {token ? false : true}/>
          </Scene>
  
          <Scene key="main">
            <Scene
              onRight={() => Actions.todoDetail()}
              rightTitle="Add"
              key="todoList"
              component={ToDoList}
              title="To Do"
              initial = {token ? true : false}
            />
            <Scene key="todoDetail" component={ToDoDetail} title="To do details" />
          </Scene>
        </Scene>
        
      </Router>
    );
  })
};

export default RouterComponent;
