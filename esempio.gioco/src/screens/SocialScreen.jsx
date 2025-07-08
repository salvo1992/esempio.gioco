// src/screens/SocialScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Share,
} from 'react-native';
import useAnimatedBackground from '../hook/useAnimatedBackground';

const actions = [
  { key: 'shareScore', label: 'Condividi Best Score' },
  { key: 'tradeSkin', label: 'Scambia Skin' },
  { key: 'friends', label: 'Amici' },
  { key: 'invite', label: 'Invita un amico' },
  { key: 'rate', label: 'Valuta l\'App' },
];

export default function SocialScreen() {
  const bgColor = useAnimatedBackground(['#f1f8e9', '#aed581']);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    // fetch best score
    setBestScore(1234);
  }, []);

  const onPress = (action) => {
    switch (action) {
      case 'shareScore':
        Share.share({ message: `My best score is ${bestScore}!` });
        break;
      // TODO: implement other actions
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bgColor }]} />
      <View style={styles.content}>
        <Text style={styles.header}>Social</Text>
        <FlatList
          data={actions}
          keyExtractor={i => i.key}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item.key)} style={styles.button}>
              <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex:1, padding:16 },
  header: { fontSize:22, fontWeight:'700', marginBottom:12, color:'#33691e' },
  button: { backgroundColor:'#558b2f', padding:12, borderRadius:6, marginBottom:8 },
  buttonText: { color:'#fff', fontSize:16, textAlign:'center' },
});