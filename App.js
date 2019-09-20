/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
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

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

class HomeScreen extends React.Component {
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
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
