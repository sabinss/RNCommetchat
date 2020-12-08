import React, {useEffect} from 'react';
import {StyleSheet, View, Text , Button , TextInput} from 'react-native';
import VideoCall from './src/screens/cometchat';
import keys from './keys';
import {CometChat} from '@cometchat-pro/react-native-chat';

const App = () => {
  const [joinCall , setJoinCall] = React.useState(false);
  const [sessionId , setSessionId] = React.useState('');

  const cometChatLogin = () => {
    CometChat.login('superhero4', keys.AUTH_KEY).then(
      (User) => {
        console.log('Login Successful:', {User});
        // User loged in successfully.
        // navigation.navigate("Chat");
        /*   setShowMain(true); */
      },
      (error) => {
        console.log('Login failed with exception:', {error});
        // User login failed, check error and take appropriate action.
      },
    );
  };
  let sessionID = 'superhero4';
  useEffect(() => {
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(keys.REGION)
      .build();
    CometChat.init(keys.APP_ID, appSetting)
      .then(() => {
        console.log('Initialization completed successfully');
        cometChatLogin();
        CometChat.addConnectionListener(
          'XMPPConnectionListener',
          new CometChat.ConnectionListener({
            onConnected: () => {
              console.log('ConnectionListener => On Connected');
            },
            inConnecting: () => {
              console.log('ConnectionListener => In connecting');
            },
            onDisconnected: () => {
              console.log('ConnectionListener => On Disconnected');
            },
          }),
        );
        CometChat.getLoggedinUser().then((user) => {
          if (user !== null) {
            console.log('Commet chat logged in user', user);
          }
        });
      })
      .catch((error) => {
        console.log('Initialization failed with error:', error);
      });
  }, []);

  return (
    <View>
   {
     !joinCall &&  <Button title="Start a Call" onPress={()=>{
      setSessionId('superhero4');
      setJoinCall(true)
    }}/>
   }
    {
      joinCall &&   <View>
      <TextInput placeholder="Enter invite id" onChangeText={(val)=>{
        setSessionId(val)
      }}/>
      <Button title="Join a call" onPress={()=>{
        setJoinCall(true);
      }}/>
  </View>
    }
        {
          joinCall && <VideoCall sessionID={sessionID} />
        }
     </View>
    );
};

const styles = StyleSheet.create({});

export default App;
this;
