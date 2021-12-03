import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import home_screen from './screen/home_screen';
import ocr_screen from './screen/ocr_screen';
import storage_screen from './screen/storage_screen';

import { Provider } from 'react-redux';
import createStore from './store';
import reducers from './reducers';

const store = createStore(reducers);
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={home_screen} />
          <Stack.Screen name="Ocr" component={ocr_screen} />
          <Stack.Screen name="Storage" component={storage_screen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
};

export default App;