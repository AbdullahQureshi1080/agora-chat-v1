import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import styles from './ScreenStyles';

export default function Screen({children, navigation, isBack}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.BACKGROUND}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 30}
        style={styles.AVOIDING_VIEW}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
