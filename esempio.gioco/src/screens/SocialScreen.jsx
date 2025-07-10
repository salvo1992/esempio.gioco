// src/screens/SocialScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  Share,
} from 'react-native';
import useAnimatedBackground from '../hook/useAnimatedBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function SocialScreen({ navigation }) {
  const bgColor = useAnimatedBackground(['#e3f2fd', '#bbdefb']);
  const [bestScore, setBestScore] = useState(0);
  const [rating, setRating] = useState(0);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Caricamento dati iniziali
    setBestScore(1234); // TODO: recuperare dal gioco
    AsyncStorage.getItem('friends').then(json => {
      setFriends(json ? JSON.parse(json) : []);
    });
  }, []);

  // Condividi miglior punteggio
  const shareScore = () => {
    Share.share({ message: `Il mio Best Score è ${bestScore}!` });
  };

  // Invia valutazione stellata
  const submitRating = () => {
    AsyncStorage.getItem('ratings').then(json => {
      const arr = json ? JSON.parse(json) : [];
      arr.push({ rating, date: new Date().toISOString() });
      AsyncStorage.setItem('ratings', JSON.stringify(arr));
    });
  };

  // Invita amico via share link e attribuisci coin
  const inviteFriend = () => {
    Share.share({ message: 'Unisciti a Whack-a-Mole! Scarica l’app e guadagna 300 coin!', url: 'https://link.to.app' });
    AsyncStorage.getItem('coins').then(json => {
      const coins = json ? Number(json) : 0;
      AsyncStorage.setItem('coins', String(coins + 300));
    });
  };

  // Lista azioni social
  const actions = [
    { key: 'shareScore', label: 'Condividi Best Score', handler: shareScore },
    { key: 'invite', label: 'Invita un amico', handler: inviteFriend },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bgColor }]} />
      <View style={styles.content}>
        <Text style={styles.header}>Social</Text>

        {/* Azioni principali */}
        {actions.map(item => (
          <TouchableOpacity key={item.key} style={styles.button} onPress={item.handler}>
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Valutazione App */}
        <Text style={styles.section}>Valuta l’App</Text>
        <View style={styles.starRow}>
          {[1,2,3,4,5].map(i => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              <Ionicons
                name={i <= rating ? 'star' : 'star-outline'}
                size={32}
                color="#ffcc00"
                style={{ marginHorizontal: 4 }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={submitRating}>
          <Text style={styles.buttonText}>Invia Valutazione</Text>
        </TouchableOpacity>

        {/* Lista Amici */}
        <Text style={styles.section}>I tuoi Amici</Text>
        <FlatList
          data={friends}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => <Text style={styles.friend}>{item}</Text>}
          ListEmptyComponent={<Text style={styles.empty}>Non hai ancora amici.</Text>}
        />

        {/* Scambia Skin */}
        <Text style={styles.section}>Scambia Skin</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Customize')}
        >
          <Text style={styles.buttonText}>Vai a Personalizza</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 16 },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 20, color: '#33691e', textAlign: 'center' },
  button: { backgroundColor: '#558b2f', padding: 14, borderRadius: 8, marginVertical: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  section: { fontSize: 20, fontWeight: '600', marginTop: 24, marginBottom: 12, color: '#33691e' },
  starRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
  friend: { fontSize: 16, paddingVertical: 6, borderBottomWidth: 1, borderColor: '#ddd' },
  empty: { fontSize: 14, color: '#666', fontStyle: 'italic', textAlign: 'center' },
});
