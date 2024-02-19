import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// console.log('THE COLORS', Colors);

export default StyleSheet.create({
  BACKGROUND: {
    backgroundColor: 'transparent',
    //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
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
    borderColor: Colors.light,
    paddingHorizontal: 5,
    height: 40,
    fontSize: 16,
    color: Colors.text,
  },
  SECTION_CONTAINER: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  SECTION_CONTAINER_LIST: {
    marginTop: 32,
    marginHorizontal: 24,
    borderRadius: 8,
    height: 200,
    backgroundColor: Colors.grey,
    // paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  SECTION_CONTAINER_SELECTED_LIST: {
    marginTop: 32,
    marginHorizontal: 24,
    borderRadius: 8,
    height: 200,
    backgroundColor: Colors.primary,
  },
  SECTION_TITLE: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.text,
  },
  SECTION_DESCRIPTION: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.text,
  },
  highlight: {
    fontWeight: '700',
  },
  HELPER_TEXT: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.icon,
  },
  LIST_USER: {
    flexDirection: 'row',
    backgroundColor: Colors.chat,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    alignItems: 'center',
    marginVertical: 2,
    justifyContent: 'space-between',
  },
});
