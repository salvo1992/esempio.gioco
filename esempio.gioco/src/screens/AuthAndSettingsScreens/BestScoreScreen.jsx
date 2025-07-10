// src/screens/AuthAndSettingsScreens/BestScoreScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAnimatedBackground from '../../hook/useAnimatedBackground';

const CLOUD_ENDPOINT = 'https://api.example.com/scores'; // placeholder

export default function BestScoreScreen() {
  const bgColor = useAnimatedBackground(['#a1c4fd', '#c2e9fb']);
  const [userScores, setUserScores] = useState([]);
  const [friendScores, setFriendScores] = useState([]);
  const [best, setBest] = useState(0);

  // Load local and sync with cloud
  useEffect(() => {
    async function loadScores() {
      // local
      const localJson = await AsyncStorage.getItem('userScores');
      const local = localJson ? JSON.parse(localJson) : [];
      setUserScores(local);
      setBest(local.length ? Math.max(...local.map(o => o.score)) : 0);

      // post to cloud
      try {
        await fetch(CLOUD_ENDPOINT + '/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scores: local }),
        });
      } catch (e) {
        console.warn('Errore invio cloud:', e);
      }

      // get friends scores from cloud
      try {
        const resp = await fetch(CLOUD_ENDPOINT + '/friends');
        const data = await resp.json();
        setFriendScores(data || []);
      } catch (e) {
        console.warn('Errore fetch amici:', e);
      }
    }
    loadScores();
  }, []);

  // Share best record
  const shareBest = () => {
    const message = `🏆 Whack-a-Mole: il mio record è ${best} punti! Scarica l'app: https://link.to.app e prova a battermi!`;
    Share.share({ message });
  };

  const renderUserScore = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <Text style={styles.score}>{item.score}</Text>
      <Text style={styles.level}>Lv {item.level}</Text>
    </View>
  );

  const renderFriendScore = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
      <Text style={styles.level}>Lv {item.level}</Text>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>      
      <SafeAreaView style={styles.inner}>
        {/* Share Best Record Button */}
        <TouchableOpacity style={styles.shareButton} onPress={shareBest}>
          <Text style={styles.shareText}>Condividi il mio record: {best} pt</Text>
        </TouchableOpacity>

        {/* User Scores */}
        <Text style={styles.title}>Miei Punteggi</Text>
        <FlatList
          data={userScores}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderUserScore}
          ListEmptyComponent={<Text style={styles.empty}>Nessun punteggio salvato.</Text>}
        />

        {/* Friend Scores */}
        <Text style={styles.title}>Punteggi Amici</Text>
        <FlatList
          data={friendScores}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderFriendScore}
          ListEmptyComponent={<Text style={styles.empty}>Nessun punteggio amici.</Text>}
        />
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, padding: 16 },
  shareButton: {
    backgroundColor: '#ffea00',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffc107',
  },
  shareText: { color: '#333', fontSize: 16, fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '700', marginVertical: 12, color: '#333' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  rank: { width: 30, fontSize: 16, color: '#555' },
  name: { flex: 1, fontSize: 16, fontWeight: '600', color: '#444' },
  score: { width: 80, fontSize: 16, color: '#333', textAlign: 'right' },
  level: { width: 60, fontSize: 14, color: '#666', textAlign: 'right' },
  empty: { textAlign: 'center', color: '#888', fontStyle: 'italic', marginVertical: 20 },
});

