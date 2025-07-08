// src/screens/AuthAndSettingsScreens/SettingsScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAnimatedBackground from '../../hook/useAnimatedBackground';

export function SettingsScreen({ navigation }) {
  // Colori sfondo animato
  const bgColor = useAnimatedBackground(['#d9a7c7', '#fffcdc']);

  // State impostazioni
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('it');

  // Carica impostazioni salvate
  useEffect(() => {
    AsyncStorage.multiGet([
      'musicEnabled','sfxEnabled','vibrationEnabled','difficulty','language','user'
    ]).then(entries => {
      const settings = Object.fromEntries(entries);
      if (settings.musicEnabled != null) setMusicEnabled(settings.musicEnabled === 'true');
      if (settings.sfxEnabled != null) setSfxEnabled(settings.sfxEnabled === 'true');
      if (settings.vibrationEnabled != null) setVibrationEnabled(settings.vibrationEnabled === 'true');
      if (settings.difficulty) setDifficulty(settings.difficulty);
      if (settings.language) setLanguage(settings.language);
      if (settings.user) setUser(JSON.parse(settings.user));
    });
  }, []);

  const persist = (key, val) => AsyncStorage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : String(val));

  const resetHistory = () => {
    Alert.alert(
      'Conferma reset',
      'Sei sicuro di voler cancellare tutti i punteggi migliori?',
      [
        { text: 'Annulla', style: 'cancel' },
        { text: 'OK', onPress: async () => {
            await AsyncStorage.removeItem('history');
            Alert.alert('Punteggi resettati');
          }}
      ]
    );
  };

  const handleLogin = () => navigation.navigate('Login');
  const handleLogout = () => {
    setUser(null);
    persist('user', null);
  };

  const languages = [
    { code: 'it', label: 'Italiano' },
    { code: 'en', label: 'English' }
  ];

  return (
    <View style={styles.root}>
      {/* Sfondo animato */}
      <Animated.View style={[styles.background, { backgroundColor: bgColor }]} />
      {/* Contenuto protetto da SafeArea */}
      <SafeAreaView style={styles.safeContainer}>
        {/* Header con logo */}
        <View style={styles.headerRow}>
          <Image source={require('../../assets/mole.png')} style={styles.headerLogo} />
          <Text style={styles.header}>Impostazioni</Text>
        </View>

        {/* Sezione Utente */}
        {user ? (
          <View style={styles.userRow}>
            <Image source={require('../../assets/mole.png')} style={styles.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Esci</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>Accedi o Registrati</Text>
          </TouchableOpacity>
        )}

        {/* Toggles impostazioni */}
        <SettingRow label="Musica" value={musicEnabled} onValueChange={val => { setMusicEnabled(val); persist('musicEnabled', val); }} />
        <SettingRow label="Effetti Sonori" value={sfxEnabled} onValueChange={val => { setSfxEnabled(val); persist('sfxEnabled', val); }} />
        <SettingRow label="Vibrazione" value={vibrationEnabled} onValueChange={val => { setVibrationEnabled(val); persist('vibrationEnabled', val); }} />

        {/* Difficoltà */}
        <Text style={styles.subheader}>Difficoltà</Text>
        <View style={styles.choiceRow}>
          {['easy','medium','hard'].map(level => (
            <TouchableOpacity
              key={level}
              style={[styles.choice, difficulty===level && styles.choiceActive]}
              onPress={() => { setDifficulty(level); persist('difficulty', level); }}
            >
              <Text style={styles.choiceText}>{level.charAt(0).toUpperCase()+level.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lingua App */}
        <Text style={styles.subheader}>Lingua App</Text>
        <View style={styles.choiceRow}>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[styles.choice, language===lang.code && styles.choiceActive]}
              onPress={() => { setLanguage(lang.code); persist('language', lang.code); }}
            >
              <Text style={styles.choiceText}>{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Help */}
        <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.helpText}>Segnala un problema</Text>
        </TouchableOpacity>

        {/* Reset punteggi */}
        <TouchableOpacity style={styles.resetButton} onPress={resetHistory}>
          <Text style={styles.resetText}>Reset Best Scores</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

function SettingRow({ label, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  background: { ...StyleSheet.absoluteFillObject },
  safeContainer: { flex: 1, paddingHorizontal: 20, paddingBottom: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerLogo: { width: 32, height: 32, marginRight: 10 },
  header: { fontSize: 28, fontWeight: '900', color: '#333' },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontSize: 18, fontWeight: '600', flex: 1 },
  logoutButton: { padding: 6, backgroundColor: '#ff6f61', borderRadius: 6 },
  logoutText: { color: '#fff' },
  loginButton: { padding: 12, backgroundColor: '#54a0ff', borderRadius: 6, marginBottom: 20, alignItems: 'center' },
  loginText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  label: { flex: 1, fontSize: 18 },
  subheader: { fontSize: 20, fontWeight: '700', color: '#333', marginTop: 20, marginBottom: 10 },
  choiceRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  choice: { padding: 10, marginHorizontal: 8, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.1)' },
  choiceActive: { backgroundColor: '#04d361' },
  choiceText: { color: '#333', fontWeight: '600' },
  helpButton: { marginTop: 10, padding: 12, backgroundColor: '#ffa502', borderRadius: 6, alignItems: 'center' },
  helpText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  resetButton: { marginTop: 20, backgroundColor: '#ff6f61', padding: 12, borderRadius: 8, alignItems: 'center' },
  resetText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});