import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// console.log('THE COLORS', Colors);

export default StyleSheet.create({
  BACKGROUND: {
    backgroundColor: '"transparent"',
    flex: 1,
  },
  SCREEN_TITLE: {
    fontSize: 30,
    alignSelf: 'center',
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
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    color: '#000',
    // width: '100%',
  },
  SECTION_CONTAINER: {
    marginTop: 32,
    marginBottom: 20,
    // paddingHorizontal: 24,
  },
  SECTION_TITLE: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
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
