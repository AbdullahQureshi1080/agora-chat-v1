import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
    width: '25%',
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ffffff', width: '100%', borderRadius: 8},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '100%', height: 500, borderRadius: 8},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  head: {fontSize: 20, fontWeight: '800', color: '#000'},
  info: {backgroundColor: '#ffffe0', color: '#0000ff'},
  back: {
    fontSize: 18,
    fontWeight: '300',
    color: '#000',
  },
});
