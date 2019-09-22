import React, { Fragment } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Prompt from './play/prompt';
import SocketProvider from './play/socket_provider';
import Terminal from './play/terminal';

class ClientScreen extends React.Component {
  static navigationOptions = {
    title: 'Grapevine',
    headerStyle: {
      backgroundColor: '#000000',
    },
    headerTintColor: '#a972da',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 26,
    },
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <SocketProvider game="DevGame" sessionToken="SFMyNTY.g3QAAAACZAAEZGF0YW0AAAAkOTZkYzllNGItNTY1NS00OTczLWE3ZWYtN2FmNDE4ZGM3NmNhZAAGc2lnbmVkbgYAkId9Wm0B.X_4qtqLgkVbFSVMHBSM5O-sLqhIGJaCiUIy56i3Fpc8">
          <SafeAreaView style={{flex: 1, backgroundColor: "#000000"}}>
            <ScrollView style={{backgroundColor: "#000000", flexGrow: 1}}>
              <Terminal />
            </ScrollView>
            <Prompt />
          </SafeAreaView>
        </SocketProvider>
      </Fragment>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Client: ClientScreen,
  },
  {
    initialRouteName: 'Client',
  }
);

export default createAppContainer(AppNavigator);
