import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  AVOIDING_VIEW: {
    flex: 1,
    // backgroundColor: '#000',
    padding: '5%',
  },
  BACKGROUND: {
    flex: 1,
    // backgroundColor: '"red"',
  },
  SCREEN_TITLE: {
    fontSize: 30,
    alignSelf: 'center',
  },
  HEADING: {},
  INPUT_BOX: {
    marginVertical: 10,
  },
  LABEL: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  INPUT: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.text,
    paddingHorizontal: 5,
    height: 40,
    fontSize: 16,
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
});
