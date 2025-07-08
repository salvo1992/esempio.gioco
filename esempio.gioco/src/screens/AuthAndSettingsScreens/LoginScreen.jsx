// src/screens/AuthAndSettingsScreens/LoginScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import useAnimatedBackground from '../../hook/useAnimatedBackground';

export  function LoginScreen({ navigation }) {
  const bgColor = useAnimatedBackground(['#89f7fe', '#66a6ff']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    // TODO: implement authentication logic
    navigation.replace('Home');
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>      
      <SafeAreaView style={styles.inner}>
        <Text style={styles.header}>Accedi</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={onSubmit} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Accedi</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>          
          <Text style={styles.link}>Non hai un account? Registrati</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 20, textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 },
  input: { width: '100%', padding: 12, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.8)', marginVertical: 8 },
  button: { marginTop: 20, backgroundColor: '#ff6f61', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 30, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  link: { color: '#fff', marginTop: 12, textDecorationLine: 'underline' },
});
