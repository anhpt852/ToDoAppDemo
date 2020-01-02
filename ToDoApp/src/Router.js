import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {Stack,Scene, Router, Actions, Lightbox, Overlay } from 'react-native-router-flux';
import AuthScreen from './containers/AuthScreen/AuthScreen';
import ToDoList from './containers/ToDoList/ToDoList';
import ToDoDetail from './containers/ToDoDetail/ToDoDetail';
import WheelPickerWithObjectInput from './components/TextField/WheelPickerWithObjectInput';
import {addToDo, getAllToDo, removeListToDo} from './commons/Database';
import CF from './commons/CF'
import _ from 'lodash';
import moment from 'moment';
class Routes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUserLogin: false
    }
  };

  componentDidMount() {
    console.log('aaaa');
    
    CF.getUserInfo((userInfo)=>{
      if (_.isEmpty(userInfo)) {
        this.setState({isUserLogin:false})
      } else {
        CF.checkNetwork((haveNetwork)=>{
          if (haveNetwork) {
            this.syncDataWhenHaveNetwork()
          } else {
            this.setState({isUserLogin:true})
          }
        })
      }
    })
  }

  syncDataWhenHaveNetwork(){
    const { currentUser } = firebase.auth();
    getAllToDo((isSuccess,objects)=>{
      if (objects.length > 0) {
          var newListToDo = [];
          var updateItems = [];
          var createdItems = [];
          var removedItems = [];

          objects.forEach(element => {
            var newElement = JSON.parse(JSON.stringify(element));
            newElement.priority = JSON.parse(element.priority);
            newElement.datetime = moment.utc(element.datetime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
            if(newElement.syncStatus === 'edit'){
              updateItems.push({...newElement, syncStatus:'none'});
            } else if (newElement.syncStatus === 'delete'){
              removedItems.push(newElement);
            } else if (newElement.syncStatus === 'create_new'){
              removedItems.push(newElement);
              createdItems.push({...newElement, syncStatus:'none'});
            }

          });
          console.log(newListToDo);
          
          var updates = {};
          var tmp= [];

          createdItems.map(item => {
            var newPostKey = firebase.database().ref(`/users/${currentUser.uid}/todos`).push().key;
            updates[newPostKey] = item;
            tmp.push({...item,uid: newPostKey})
          });

          updateItems.map(item => {
            updates[item.uid] = item;
            tmp.push(item)
          });

          removedItems.map(item => {
            updates[item.uid] = null;
          });

          if(_.isEmpty(updates)){
            this.setState({isUserLogin:true})
          } else {
            firebase.database().ref(`/users/${currentUser.uid}/todos`).update(updates).then(()=>{
              addToDo(tmp,null);
              removeListToDo(removedItems,null);
              this.setState({isUserLogin:true})
            });
          }
          
      } 
    })
  }
  render(){
    return (
      <Router sceneStyle={{ }}>
        <Overlay key="overlay">
          <Lightbox key="modal" hideNavBar>
            <Stack key="root" hideNavBar>
              
              <Scene key="auth"  initial = {!this.state.isUserLogin}>
                <Scene key="login"  swipeEnabled={false} animationEnabled={false} component={AuthScreen} hideNavBar/>
              </Scene>
  
              <Scene key="main" initial = {this.state.isUserLogin}>
                <Scene
                  type="reset"
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
