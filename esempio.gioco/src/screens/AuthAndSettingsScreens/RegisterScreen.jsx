// Register Screen
import React, { useState, useEffect } from 'react';
import useAnimatedBackground from '../../hook/useAnimatedBackground';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  StyleSheet,
  TextInput,
} from 'react-native';
import { register, login } from '../../../firebaseConfig';  // o il path giusto al tuo config

export function RegisterScreen({ navigation }) {
  const bgColor = useAnimatedBackground(['#fad0c4', '#ffd1ff']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    // TODO: implement registration
    navigation.replace('Home');
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>      
      <SafeAreaView style={styles.inner}>
        <Text style={styles.header}>Registrati</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.submitButton} onPress={onRegister} activeOpacity={0.8}>
          <Text style={styles.submitText}>Registrati</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Hai già un account? Accedi</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
}
// Shared styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 28, fontWeight: '900', color: '#333', marginBottom: 20 },
  subheader: { fontSize: 20, fontWeight: '700', color: '#333', marginTop: 20, marginBottom: 10 },
  input: { width: '100%', padding: 12, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.8)', marginBottom: 12 },
  submitButton: { width: '60%', padding: 14, backgroundColor: '#ff6f61', borderRadius: 30, alignItems: 'center', marginVertical: 12 },
  submitText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  link: { color: '#555', marginTop: 8, textDecorationLine: 'underline' },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  label: { fontSize: 18, flex: 1 },
  choice: { padding: 10, marginHorizontal: 6, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.6)' },
  choiceActive: { backgroundColor: '#333' },
  choiceText: { color: '#333', fontWeight: '600' },
  scoreRow: { flexDirection: 'row', width: '100%', justifyContent: 'flex-start', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  scoreIndex: { width: 30, fontSize: 18, color: '#333' },
  scoreValue: { fontSize: 18, color: '#333' },
});