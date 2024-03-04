import React, {useRef, useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
  EncryptionMode,
} from 'react-native-agora';
// import {EncryptionMode} from 'react-native-agora-rtc-ng';

import AgoraUIKit from 'agora-rn-uikit';

import {AppConfig} from '../../../Config';

import styles from './AgoraVideoStyles';
import Screen from '../../../components/screen/Screen';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/button/Button';
import {firebase} from '@react-native-firebase/firestore';

const appId = AppConfig.APP_ID;

export default function AgoraVideo({route}) {
  const fUserId = firebase.auth().currentUser;
  const {params} = route;

  const encryption = {
    key: '3e84f5e40d43b74cfffdcc32f1c1055821ee878b1500ed376a152d0deda92d9d',
    salt: 'TAfwdGaWrBPnpMEyeB0lFwU1PS2FV5ZhKHBBR0u4asI=',
  };

  const [videoCall, setVideoCall] = useState(false);
  const connectionData = {
    appId: appId,
    channel: params?.room?.channelName,
    token: params?.room?.token,
    uid: params?.room?.channelAccessId,
    // encryption: {
    //   key: 'A',
    //   salt: 'B',
    // },
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  const navigation = useNavigation();
  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [remoteUids, setRemoteUids] = useState([]);
  const [message, setMessage] = useState(''); // Message to the user

  const [channel, setChannel] = useState();

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  useEffect(() => {
    // NativeDevSettings.setIsDebuggingRemotely(true);
    if (params && params?.room) {
      // console.log('APP ID', appId);
      // console.log('Paramrs', params.room);
      setChannel(params.room);
    }
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: e => {
          // console.log('EE', e);
          showMessage(
            'Successfully joined the channel ' + params?.room?.channelName,
          );
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
          // setRemoteUids([...remoteUids, Uid]);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
          // let remUids =
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      let encryptionConfig = {
        encryptionBase64: encryption.salt,
        encryptionKey: encryption.key,
        encryptionMode: EncryptionMode.Aes128Ecb,
      };
      agoraEngine.enableEncryption(true, {});
      agoraEngine.enableVideo();
      // agoraEngine.enableAudio();
    } catch (e) {
      console.log(e);
    }
  };

  const join = async () => {
    // console.log('CHANNEL', channel);
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(
        params?.room?.token,
        params?.room?.channelName,
        params?.room?.channelAccessId,
        {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        },
      );
      // agoraEngineRef.current.jo
      // Alert.alert('Hee');
      // agoraEngineRef.current?.joinChannel(
      //   channel?.token,
      //   channel?.channelName,
      //   channel?.roomCreatorId == fUserId?.uid
      //     ? channel?.roomCreatorId
      //     : channel?.participantId,
      //   {
      //     clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      //   },
      // );
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  function showMessage(msg: string) {
    setMessage(msg);
  }

  return (
    <Screen isBack={true} navigation={navigation}>
      <Text style={styles.back} onPress={() => navigation.goBack()}>
        {'< back'}
      </Text>
      {videoCall ? (
        <AgoraUIKit
          connectionData={connectionData}
          rtcCallbacks={callbacks}
          // rtmCallbacks={callbacks}
          // styleProps={}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button
            name={'Join'}
            onPress={() => setVideoCall(true)}
            containerStyle={styles.button}
          />
        </View>
      )}
      {/* <View style={styles.btnContainer}>
        <View>
          <Text style={styles.head}>Video Calling</Text>
          <Text style={{...styles.head, fontWeight: '300'}}>
            {channel?.channelName}
          </Text>
        </View>

        {isJoined ? (
          <Button
            name={'Leave'}
            onPress={() => leave()}
            containerStyle={{
              ...styles.button,
              backgroundColor: isJoined ? 'red' : '#1e1e1e',
            }}
            labelStyle={{color: '#fff'}}
          />
        ) : (
          <Button
            name={'Join'}
            onPress={() => join()}
            containerStyle={styles.button}
          />
        )}
      </View> */}
      {/* <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined ? (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
            <Text>Local user uid: {connectionData.uid}</Text>
          </React.Fragment>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{uid: remoteUid}}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>Waiting for a remote user to join</Text>
        )}
        <Text style={styles.info}>{message}</Text>
      </ScrollView> */}
    </Screen>
  );
}
