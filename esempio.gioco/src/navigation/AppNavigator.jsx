// src/navigation/AppNavigator.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import degli screen
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import EndScreen from '../screens/EndScreen';
import { LoginScreen } from '../screens/AuthAndSettingsScreens/LoginScreen';

import {RegisterScreen} from '../screens/AuthAndSettingsScreens/RegisterScreen';
import {SettingsScreen} from '../screens/AuthAndSettingsScreens/SettingsScreen';
import {BestScoreScreen} from '../screens/AuthAndSettingsScreens/BestScoreScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#04d361' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Whack-a-Mole', headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Accedi' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registrati' }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ title: 'Gioca!' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Impostazioni' }}
        />
        <Stack.Screen
          name="BestScore"
          component={BestScoreScreen}
          options={{ title: 'Best Scores' }}
        />
        <Stack.Screen
          name="End"
          component={EndScreen}
          options={{ title: 'Game Over' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}





