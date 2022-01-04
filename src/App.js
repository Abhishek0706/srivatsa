import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

import NewItemScreen from './screens/NewItemScreen';
import {combineReducers, createStore} from 'redux';
import itemsReducer from './store/itemsReducer';
import {Provider} from 'react-redux';

const Stack = createStackNavigator();

const rootReducer = combineReducers({items: itemsReducer});
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowColor: 'black',
              shadowOpacity: 1,
              shadowRadius: 3.84,
              elevation: 15,
            },
            headerTintColor: 'darkblue',
          }}>
          <Stack.Screen
            name="NewItem"
            component={NewItemScreen}
            options={{headerTitleAlign: 'center'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
