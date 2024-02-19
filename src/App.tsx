/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useEffect, useReducer, useState} from 'react';
import {ActivityIndicator, LogBox, View} from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/auth/login/Login';
import Rooms from './screens/rooms/Rooms';
import Room from './screens/room/Room';
import Register from './screens/auth/register/Register';

import {AppProvider, setLoggedInUser, useUserContext} from './context/Context';

LogBox.ignoreAllLogs(true);

import {getUserFromDatabase} from './database/db';
import {getUserData, storeUserData} from './utils/storage';

// let matrix = new MatrixService();

// import matrix from './rn-matrix/services/matrix';

const Stack = createStackNavigator();

const AuthStack = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Rooms"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
};

const App = props => {
  const {store, dispatch} = useUserContext();

  console.log('THE STORE ', store);
  const [userData, setUserData] = useState(null);

  const getData = async () => {
    let userMD = await getUserData();
    console.log('THE USER MD DATA', userMD);
    if (userMD) {
      const user = await getUserFromDatabase(userMD.id);
      setUserData(user);
      storeUserData(user);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userData) {
      setLoggedInUser(dispatch, userData);
      console.log('THE STORAGE DATA', userData);
      return;
    }
  }, [userData]);

  return (
    <NavigationContainer>
      {store && store.isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const APPWRAPPER = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default APPWRAPPER;
