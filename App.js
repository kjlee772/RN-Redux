import React from 'react';
import { StyleSheet, View, } from 'react-native';

import { Provider } from 'react-redux';

// import CountComponent from './components/Count';
import CountFCComponent from './components/CountFC';

import createStore from './store';
import reducers from './reducers';

const store = createStore(reducers);

const App = () => {
  return (
    <Provider store={store}>
      <View>
        {/* <CountComponent /> */}
        <CountFCComponent />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;