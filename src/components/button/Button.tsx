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
  disabled?: false;
}

export default function Button(props: button) {
  const {onPress, containerStyle, labelStyle, name, loading, disabled} = props;
  return (
    <TouchableOpacity
      {...props}
      style={[styles.CONTAINER, containerStyle]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Text style={[styles.NAME, labelStyle]}>{name}</Text>
      )}
    </TouchableOpacity>
  );
}
