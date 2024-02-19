import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import Screen from '../../components/screen/Screen';
import styles from './RoomStyles';

import Button from '../../components/button/Button';

export default function Room({route, navigation}) {
  return (
    <Screen isBack={true} navigation={navigation}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text style={styles.SCREEN_TITLE}>Room</Text>
    </Screen>
  );
}
