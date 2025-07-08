// src/navigation/AppNavigator.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HelpScreen from '../screens/AuthAndSettingsScreens/HelpScreen';
// Import degli screen
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import EndScreen from '../screens/EndScreen';
import { LoginScreen } from '../screens/AuthAndSettingsScreens/LoginScreen';
import ShopScreen from '../screens/ShopScreen';
import SocialScreen from '../screens/SocialScreen';
import CustomizeScreen from '../screens/CustomizeScreen';

 
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
          name="Help"
          component={HelpScreen}
          options={{ title: 'Supporto' }}
        />

        <Stack.Screen
          name="BestScore"
          component={BestScoreScreen}
          options={{ title: 'Best Scores' }}
        />
 <Stack.Screen
         name="Shop"
         component={ShopScreen}
         options={{ title: 'Shop' }}
       />
       <Stack.Screen
         name="Social"
         component={SocialScreen}
         options={{ title: 'Social' }}
       />
       <Stack.Screen
         name="Customize"
         component={CustomizeScreen}
         options={{ title: 'Personalizza' }}
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





