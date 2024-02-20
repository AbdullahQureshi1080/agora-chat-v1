import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// console.log('THE COLORS', Colors);

export default StyleSheet.create({
  BACKGROUND: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  SCREEN_TITLE: {
    fontSize: 30,
    // alignSelf: 'center',
    color: '#000',
  },
  HEADING: {},
  INPUT_BOX: {
    marginVertical: 10,
  },
  LABEL: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
    color: '#000',
  },
  INPUT: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.light,
    paddingHorizontal: 5,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  SECTION_CONTAINER: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  SECTION_TITLE: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  SECTION_DESCRIPTION: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  ACTIVITY_INDICATOR: {
    alignSelf: 'center',
  },
  ACIVITY_WAIT_VIEW: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ROOM: {
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: '#E5E5E5',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  ROOM_NAME: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  ROOM_MESSAGE: {
    fontSize: 12,
    fontWeight: '300',
    color: '#000',
  },
});
