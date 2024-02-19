import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  CONTAINER: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    marginVertical: 5,
  },
  NAME: {
    fontSize: 16,
    alignSelf: 'center',
    color: Colors.light,
    fontWeight: '700',
  },
});
