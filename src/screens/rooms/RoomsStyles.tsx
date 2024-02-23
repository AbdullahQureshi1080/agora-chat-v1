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
    marginVertical: 10,
    paddingHorizontal: 15,
    // height: 100,
    // backgroundColor: '#8CB9BD',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.primary,
    paddingVertical: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  ROOM_NAME: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    // alignSelf: 'center',
  },
  ROOM_MESSAGE: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
  },
});
