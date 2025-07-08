import useAnimatedBackground from '../../hook/useAnimatedBackground';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Animated,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
export function BestScoreScreen() {
  const bgColor = useAnimatedBackground(['#a1c4fd', '#c2e9fb']);
  const [bestScores, setBestScores] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('history').then(json => {
      const arr = json ? JSON.parse(json) : [];
      setBestScores(arr);
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>      
      <SafeAreaView style={styles.inner}>
        <Text style={styles.header}>Best Scores</Text>
        <FlatList
          data={bestScores}
          keyExtractor={(item, i) => `${i}`}
          renderItem={({item, index}) => (
            <View style={styles.scoreRow}>
              <Text style={styles.scoreIndex}>{index+1}.</Text>
              <Text style={styles.scoreValue}>{item}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.link}>Nessun record</Text>}
        />
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