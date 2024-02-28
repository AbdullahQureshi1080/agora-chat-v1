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
import auth from '@react-native-firebase/auth';
import {userModel} from './database/model';
import AgoraVideo from './screens/interaction/video/AgoraVideo';
import AgoraAudio from './screens/interaction/Audio/AgoraAudio';

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
      <Stack.Screen name="Video" component={AgoraVideo} />
      <Stack.Screen name="Audio" component={AgoraAudio} />
    </Stack.Navigator>
  );
};

const App = (props: any) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <ActivityIndicator size={'large'} />;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
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
