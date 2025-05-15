import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/authScreens/Welcome';
import SignInScreen from '../screens/authScreens/SignInScreen';
import SignOutScreen from '../screens/authScreens/SignUpScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Bienvenido" component={WelcomeScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignOutScreen} />
      </Stack.Navigator>
  );
}