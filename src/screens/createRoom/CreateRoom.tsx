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

function CreateRoom({isVisible, setIsVisible, callbackRoom}) {
  const [roomData, setRoomData] = useState({});
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const onPressCreateRoom = () => {
    const getMembers = [...selectedUsers];
    let members = [`@${query}:localhost`];
    if (getMembers.length) {
      members = getMembers.map(m => m.userId);
    }
    console.log('Members', members);

    // Use to create a new room
    const opts = {
      name: roomData.name,
      members: members,
      enableEncryption: true,
      visibility: 'private',
      topic: 'Random',
      callbackRoom: callbackRoom,
    };
    console.log('OPTS', opts);
    ChatService.createRoom(opts);
    setIsVisible(false);
    setRoomData({});
  };

  const getUsers = async () => {
    // if (users.length == 0) {
    let results = [...users];
    results = await ChatService.searchUsers(query);
    console.log('ServerUsers', results);
    const filtersUsers = results.filter(user =>
      user?.userId?.startsWith(query),
    );
    console.log('FIlter Users', filtersUsers);
    setUsers(filtersUsers);
    setShowSuggestions(true);
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
        }}>
        <Text style={styles.LABEL}>{item.userId}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemselected = ({item, index}) => {
    return (
      <View style={styles.LIST_USER}>
        <Text style={styles.LABEL}>{item.userId}</Text>
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
      <View style={{flex: 1}}>
        <Text style={styles.SCREEN_TITLE}>Room Creation</Text>
        <View style={styles.SECTION_CONTAINER}>
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
              data={users}
              renderItem={renderItemselected}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}
        {users && users.length && showSuggestions ? (
          <View style={styles.SECTION_CONTAINER_LIST}>
            <FlatList
              data={selectedUsers}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}

        <View style={styles.SECTION_CONTAINER}>
          <Button
            name={'Create Room'}
            onPress={() => {
              onPressCreateRoom();
            }}
            containerStyle={{backgroundColor: '000'}}
            labelStyle={{color: Colors.text}}
          />
        </View>
      </View>
      <Button
        name={'Close'}
        onPress={() => {
          setRoomData({});
          setQuery('');
          setUsers([]);
          setSelectedUsers([]);
          setIsVisible(false);
        }}
      />
    </Modal>
  );
}

export default CreateRoom;
