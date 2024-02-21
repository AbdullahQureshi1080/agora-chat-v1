import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  useColorScheme,
  Alert,
  Modal,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useReducer, useEffect} from 'react';

import styles from './CreateRoomStyles';

import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../../components/button/Button';
import Screen from '../../components/screen/Screen';
import {
  addUserToDatabase,
  getAllUsersFromDatabase,
  getUserFromDatabase,
  updateUserInDatabase,
} from '../../database/db';
import {createSession} from '../../services/service';
import {firebase} from '@react-native-firebase/auth';

function CreateRoom({isVisible, setIsVisible, callbackRoom}) {
  const [roomData, setRoomData] = useState({});
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const onPressCreateRoom = async () => {
    const userId = firebase.auth().currentUser?.uid;
    // Use to create a new room
    const opts = {
      name: roomData.name,
      userId: userId,
      participants: [...selectedUsers.map(u => u.userId)],
    };
    console.log('OPTS', opts);
    const createRoom = await createSession(opts);
    console.log("room created!",createRoom)
    setIsVisible(false);
    setRoomData({});
  };

  const getUsers = async () => {
    setShowSuggestions(true);
    const users = await getAllUsersFromDatabase();
    console.log('CreateRoom: getUsers', users);
    let results = [...users];

    console.log('ServerUsers', results);
    const filtersUsers = results.filter(
      user =>
        user?.email?.includes(query) &&
        user.userId !== firebase.auth().currentUser?.uid,
    );
    console.log('FIlter Users', filtersUsers);
    setUsers(filtersUsers);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.LIST_USER}
        onPress={() => {
          if (selectedUsers.find(su => su.userId === item.userId) < -1) {
            return alert('User already selected');
          }
          setSelectedUsers([...selectedUsers, item]);
          setUsers([]);
          setQuery('');
          setShowSuggestions(false);
        }}>
        <Text style={styles.LABEL}>{item.email}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemselected = ({item, index}) => {
    return (
      <View style={{...styles.LIST_USER, backgroundColor: '#9BCF53'}}>
        <Text style={styles.LABEL}>{item.email}</Text>
        <Text
          style={styles.LABEL}
          onPress={() => {
            const filtering = [...selectedUsers];
            alert('Remove');
            const filterUsers = filtering.filter(
              fu => fu.userId !== item.userId,
            );
            setSelectedUsers(filterUsers);
          }}>
          X
        </Text>
      </View>
    );
  };

  return (
    <Modal visible={isVisible}>
      <Screen isBack={false} navigation={navigation}>
        <View style={{flex: 1}}>
          <Text style={styles.SCREEN_TITLE}>Room Creation</Text>
          <View style={styles.SECTION_CONTAINER}>
            <Button
              name={'Close'}
              onPress={() => {
                setRoomData({});
                setQuery('');
                setUsers([]);
                setSelectedUsers([]);
                setIsVisible(false);
              }}
              containerStyle={{
                backgroundColor: '#1e1e1e',
                width: '20%',
              }}
            />
            <Text style={styles.LABEL}>Name</Text>
            <TextInput
              style={styles.INPUT}
              placeholder="Name"
              onChangeText={text => {
                setRoomData({
                  ...roomData,
                  name: text,
                });
              }}
            />
            <Text style={styles.LABEL}>Add User to Room</Text>
            <TextInput
              style={styles.INPUT}
              placeholder="Username"
              onChangeText={text => {
                getUsers(text?.toLowerCase());
                setQuery(text);
              }}
            />
          </View>

          {selectedUsers && selectedUsers.length ? (
            <View style={styles.SECTION_CONTAINER_SELECTED_LIST}>
              <FlatList
                data={selectedUsers}
                renderItem={renderItemselected}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
          {users && users.length && showSuggestions ? (
            <View style={styles.SECTION_CONTAINER_LIST}>
              <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}

          <Button
            name={'Create Room'}
            onPress={() => {
              onPressCreateRoom();
            }}
            labelStyle={{color: '#fff'}}
          />
        </View>
      </Screen>
    </Modal>
  );
}

export default CreateRoom;
