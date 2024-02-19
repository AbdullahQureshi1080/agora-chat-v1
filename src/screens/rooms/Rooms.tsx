import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Screen from '../../components/screen/Screen';
import styles from './RoomsStyles';

import Config from 'react-native-config';
import {getUserData, removeUserData, storeUserData} from '../../utils/storage';
import Button from '../../components/button/Button';
import {logoutUser, useUserContext} from '../../context/Context';

import CreateRoom from '../createRoom/CreateRoom';

import {
  getAllUsersFromDatabase,
  getUserFromDatabase,
  signOut,
  updateUserInDatabase,
} from '../../database/db';

export default function Rooms({navigation}) {
  const {store, dispatch} = useUserContext();

  const [rooms, setRooms] = useState([]);

  const [user, setUser] = useState({id: ''});

  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [fetchingRooms, setFetchingRooms] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isRoomVisible, setIsRoomVisible] = useState(false);

  const [incomingVerificationRequest, setIncommingVerificationRequest] =
    useState(null);

  // Verification Actions  &  States

  // const [emojies, setEmojies] = useState([]);

  const getUsers = async () => {
    const users = await getAllUsersFromDatabase();
    const currentUser = await getUserData();
    console.log('getUsers:users:currentUsers', users, currentUser);
    const user = users.filter(us => us.userId == currentUser.userId)[0];
    console.log('getUsers:User', user);
    if (user && !currentUser.id) {
      console.log('User updated!');
      storeUserData(user);
      return updateUserInDatabase(user);
    }
    setUser(user);
    console.log('User already updated!');
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
    getRooms();
  }, []);

  const getRooms = async () => {
    //   setFetchingRooms(true);
    setLoading(false);
    //   let rooms = await ChatService.getAllRooms(null);
    //   console.log('THE ROOMS', rooms);
    //   if (rooms) {
    //     setRooms(rooms);
    //   }
    // setLoading(false);
    //   setFetchingRooms(false);
  };

  useEffect(() => {
    if (rooms.length) {
      console.log('THE ROOMS: ROOMS', rooms);
    }
  }, [rooms]);

  const onRowPress = item => {
    navigation.navigate('Room', {room: item});
  };

  const onPressLogout = async () => {
    removeUserData();
    signOut();
    logoutUser(dispatch);
    alert('All data cleared.');
  };

  const renderItem = ({item, inde}) => {
    const room = item;
    let roomName = room.name;
    return (
      <TouchableOpacity style={styles.ROOM} onPress={() => onRowPress(item)}>
        <Text style={styles.ROOM_NAME}>{roomName}</Text>
        {/* <Text style={styles.ROOM_MESSAGE}>{lastMessage}</Text> */}
      </TouchableOpacity>
    );
  };

  const callbackRoom = callbackData => {
    console.log('Hello Room is created', callbackData);
    if (callbackData) {
      getRooms();
    }
  };

  return (
    <Screen isBack={false} navigation={navigation}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={styles.SCREEN_TITLE}>AGORA CHAT</Text>

        <TouchableOpacity
          onPress={() => {
            getRooms();
          }}>
          <Text style={styles.ROOM_MESSAGE}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'000'} />
          {loggingOut ? (
            <Text style={styles.LABEL}>Logging out......</Text>
          ) : null}
          {fetchingRooms ? (
            <Text style={styles.LABEL}>Getting Rooms.....</Text>
          ) : null}
        </View>
      ) : (
        <>
          <Button name={'Create Room'} onPress={() => setIsRoomVisible(true)} />
          <FlatList
            data={rooms}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      {loggingOut ? null : (
        <Button name={'Logout'} onPress={() => onPressLogout()} />
      )}

      {isRoomVisible && (
        <CreateRoom
          isVisible={isRoomVisible}
          setIsVisible={setIsRoomVisible}
          callbackRoom={callbackRoom}
        />
      )}
    </Screen>
  );
}
