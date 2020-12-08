import React from 'react';
import {View, Text} from 'react-native';
import {CometChat} from '@cometchat-pro/react-native-chat';

export default function VideoCall({sessionID}:{sessionID:any}) {

  let deafaultLayout = true;
  // const terminateCall = () => {
  //   CometChat.endCall('SESSION_ID_FOR_THE_CALL').then(
  //     (call) => {
  //       console.log('call ended', call);
  //     },
  //     (error) => {
  //       console.log('error', error);
  //     },
  //   );
  // };
  let callListener = new CometChat.OngoingCallListener({
    onCallEnded: (call: any) => {
      console.log('Call ended:', call);
    },
    onError: (error: any) => {
      console.log('Call Error: ', error);
    },
    onUserJoined: (user: any) => {
      console.log('user joined', user);
    },
  });

  let callSettings = new CometChat.CallSettingsBuilder()
    .enableDefaultLayout(deafaultLayout)
    .setSessionID(sessionID)
    .setCallEventListener(callListener)
    .build();
  setTimeout(() => {}, 3000);

  return (
    <View style={{height: '100%', width: '100%', position: 'relative'}}>
      <Text>Comet chat sdfds</Text>
      <CometChat.CallingComponent callsettings={callSettings} />
    </View>
  );
}
