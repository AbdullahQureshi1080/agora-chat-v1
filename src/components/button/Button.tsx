import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import styles from './ButtonStyles';

interface button {
  name: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  containerStyle?: StyleProp<any>;
  labelStyle?: StyleProp<any>;
  loading?: false;
}

export default function Button(props: button) {
  const {onPress, containerStyle, labelStyle, name, loading} = props;
  return (
    <TouchableOpacity
      {...props}
      style={[styles.CONTAINER, containerStyle]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Text style={[styles.NAME, labelStyle]}>{name}</Text>
      )}
    </TouchableOpacity>
  );
}
