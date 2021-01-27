import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Button, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsList from './Screens/ProductsList';
import ProductForm from './Screens/ProductForm';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ProductsList}
          options={{ title: 'Productos' }}
        />
        <Stack.Screen
          name="Details"
          component={ProductForm}
          options={{
            title: 'Producto',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
