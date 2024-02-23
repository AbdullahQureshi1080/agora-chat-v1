import {
  ActivityIndicator,
  Alert,
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
import {firebase} from '@react-native-firebase/auth';

export default function Rooms({navigation}) {
  const {store, dispatch} = useUserContext();

  const [rooms, setRooms] = useState([]);

  const [user, setUser] = useState();

  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [fetchingRooms, setFetchingRooms] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isRoomVisible, setIsRoomVisible] = useState(false);

  const [incomingVerificationRequest, setIncommingVerificationRequest] =
    useState(null);

  // Verification Actions  &  States

  // const [emojies, setEmojies] = useState([]);

  const getUser = async () => {
    const firebaseUser = firebase.auth().currentUser;
    console.log('Rooms: getUser', firebaseUser?.email);
    const userData = {
      email: firebaseUser?.email,
      userId: firebaseUser?.uid,
    };
    // setUser(userData);
    getRooms(userData.userId);
  };

  useEffect(() => {
    setLoading(true);
    getUser();
  }, []);

  const getRooms = async (userId: string) => {
    setFetchingRooms(true);
    const dbUser = await getUserFromDatabase(userId);
    console.log('USER IS ', dbUser);
    const rooms = dbUser?.rooms;
    console.log('USER ROOMS', rooms);
    setUser(dbUser);
    setRooms(rooms);
    setLoading(false);
    setFetchingRooms(false);
  };

  const onRowPress = item => {
    navigation.navigate('Video', {
      room: {...item, channelAccessId: user?.channelAccessId},
    });
  };

  const onPressLogout = async () => {
    await removeUserData();
    signOut();
    await logoutUser(dispatch);
    Alert.alert('All data cleared.');
  };

  const renderItem = ({item, index}) => {
    const room = item;
    let roomName = room.channelName;
    let roomParticipants = room.participants;
    let particpantId = room?.participantId;
    let createrId = room?.roomCreatorId;
    return (
      <TouchableOpacity style={styles.ROOM} onPress={() => onRowPress(item)}>
        <Text style={styles.ROOM_NAME}>{roomName}</Text>
        <Text style={styles.ROOM_MESSAGE}>Participant Id: {particpantId}</Text>
        <Text style={styles.ROOM_MESSAGE}>Creater Id: {createrId}</Text>
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
          // marginHorizontal: 20,
        }}>
        <View>
          <Text style={styles.SCREEN_TITLE}>AGORA CHAT</Text>
          <Text style={styles.LABEL}>{user?.email}</Text>
          <Text style={{...styles.LABEL, fontSize: 12}}>{user?.userId}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            getRooms(user?.userId);
          }}>
          <Text style={styles.ROOM_MESSAGE}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'#000'} />
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
          {!fetchingRooms && rooms?.length == 0 ? (
            <Text style={{color: '#000', alignSelf: 'center'}}>
              No rooms for the users
            </Text>
          ) : null}
          <FlatList
            data={rooms}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      {loggingOut ? null : (
        <Button
          name={'Logout'}
          onPress={() => onPressLogout()}
          // containerStyle={{position: 'absolute', bottom: 15}}
        />
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
