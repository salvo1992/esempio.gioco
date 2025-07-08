// Settings Screen
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
} from 'react-native';
export function SettingsScreen() {
  const bgColor = useAnimatedBackground(['#d9a7c7', '#fffcdc']);
  const [sound, setSound] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');

  const toggleSound = () => setSound(prev => !prev);
  const changeDifficulty = level => setDifficulty(level);

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>      
      <SafeAreaView style={styles.inner}>
        <Text style={styles.header}>Impostazioni</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Suoni</Text>
          <Switch value={sound} onValueChange={toggleSound} />
        </View>
        <Text style={styles.subheader}>Difficoltà</Text>
        <View style={styles.row}>          
          {['easy','medium','hard'].map(level => (
            <TouchableOpacity key={level} style={[styles.choice, difficulty===level && styles.choiceActive]} onPress={() => changeDifficulty(level)}>
              <Text style={styles.choiceText}>{level.charAt(0).toUpperCase()+level.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
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