import React, { Fragment } from 'react';
import {
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
        <SocketProvider game="DevGame" sessionToken="SFMyNTY.g3QAAAACZAAEZGF0YW0AAAAkOTZkYzllNGItNTY1NS00OTczLWE3ZWYtN2FmNDE4ZGM3NmNhZAAGc2lnbmVkbgYAE6mtTm0B.G9mijmqNJ1myGXzdV4CTUvIj0CkRQbLjUsFbBfYMdb4">
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: "#000000"}}>
              <Terminal />
              <Prompt />
            </ScrollView>
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
