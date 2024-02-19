import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  useColorScheme,
  Alert,
} from 'react-native';
import React, {useState, useReducer} from 'react';

import Screen from '../../../components/screen/Screen';

import styles from './RegisterStyles';
import Button from '../../../components/button/Button';
import {initialUser, userReducer} from '../../../store/user';

import {initialLoad, loadReducer} from '../../../store/load';
import {useNavigation} from '@react-navigation/native';
import {storeUserData} from '../../../utils/storage';

import {loginUser, useUserContext} from '../../../context/Context';

import {
  addUserToDatabase,
  registerWithEmailAndPassword,
} from '../../../database/db';

function Register(props) {
  const {store, dispatch} = useUserContext();
  // const store = RootStore;
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const [emailSwitch, setEmailSwitch] = useState(false);

  const [user, userDispatch] = useReducer(userReducer, initialUser);
  const [load, loadDispatch] = useReducer(loadReducer, initialLoad);

  const loginToHomeserver = async (username: string, password: string) => {
    console.log('THE USERNAME', username);
    console.log('THE PASSWORD', password);
    if (!username || !password) {
      return Alert.alert('Please enter username & password');
    }

    const result = Promise.resolve(
      registerWithEmailAndPassword(username, password),
    );
    console.log('Result', result);
    console.log('THE RESULT', result);
    if (result) {
      // storeUserData(result);
      loginUser(dispatch, result);
      return;
    }
  };

  return (
    <Screen isBack={true} navigation={navigation}>
      <Text style={styles.SCREEN_TITLE}>MATRIX CHAT</Text>
      <View style={styles.SECTION_CONTAINER}>
        <Text style={styles.SECTION_TITLE}>Register</Text>
        <View style={styles.INPUT_BOX}>
          <Text style={styles.LABEL}>Username</Text>
          <TextInput
            style={styles.INPUT}
            placeholder="Username"
            onChangeText={text => {
              userDispatch({type: 'SET_USERNAME', payload: text});
            }}
          />
        </View>
        <View style={styles.INPUT_BOX}>
          <Text style={styles.LABEL}>Password</Text>
          <TextInput
            style={styles.INPUT}
            placeholder="Email"
            onChangeText={text => {
              userDispatch({type: 'SET_PASSWORD', payload: text});
            }}
          />
        </View>
      </View>
      <Button
        name={load.loading ? 'Loading' : 'Register'}
        onPress={() => loginToHomeserver(user.username, user.password)}
        disabled={load.loading}
      />
      <Button
        name={load.loading ? 'Loading' : 'Back to Login'}
        onPress={() => navigation.navigate('Login')}
        disabled={load.loading}
        containerStyle={{backgroundColor: '000'}}
      />
    </Screen>
  );
}

export default Register;
