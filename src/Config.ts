import Config from 'react-native-config';

export const AppConfig = {
  APP_ID: Config.APP_ID,
  encryptionKey: Config.encryptionKey,
  encryptionSaltBase64: Config.encryptionSaltBase64,
};

console.log('APP CONFIG', AppConfig);
