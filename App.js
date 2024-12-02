import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Changed this line
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KeypadScreen from './src/screens/KeypadScreen';
import HospitalsScreen from './src/screens/HospitalsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Keypad" 
          component={KeypadScreen}
          options={{ title: 'Emergency USSD' }}
        />
        <Stack.Screen 
          name="Hospitals" 
          component={HospitalsScreen}
          options={{ title: 'Nearby Hospitals' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}