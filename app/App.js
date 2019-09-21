import React from 'react';
import { Provider } from 'react-redux';

import AppNavigator from "./AppNavigator";
import { makeStore } from "./play/redux/store";

let store = makeStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
