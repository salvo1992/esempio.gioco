// src/screens/CustomizeScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAnimatedBackground from '../hook/useAnimatedBackground';

const SKINS = [
  { id: 'mole_default', name: 'Talpa Default', icon: require('../assets/mole.png') },
  { id: 'mole_fire', name: 'Talpa Fire', icon: require('../assets/mole.png') },
  { id: 'mole_gold', name: 'Talpa Gold', icon: require('../assets/mole.png') },
  { id: 'mole_ninja', name: 'Talpa Ninja', icon: require('../assets/mole.png') },
];
const HAMMERS = [
  { id: 'hammer_default', name: 'Martello Base', icon: require('../assets/hammer.png') },
  { id: 'hammer_steel', name: 'Martello Acciaio', icon: require('../assets/hammer.png') },
  { id: 'hammer_fire', name: 'Martello Fire', icon: require('../assets/hammer.png') },
  { id: 'hammer_wood', name: 'Martello Legno', icon: require('../assets/hammer.png') },
];
const LANDSCAPES = [
  { id: 'land_default', name: 'Prateria', image: require('../assets/land_default.png') },
  { id: 'land_night', name: 'Notturno', image: require('../assets/land_night.png') },
  { id: 'land_snow', name: 'Innevato', image: require('../assets/land_default.png') },
  { id: 'land_desert', name: 'Deserto', image: require('../assets/land_night.png') },
];
const POWERUPS = [
  { id: 'pu_time', name: 'Tempo Extra' },
  { id: 'pu_double', name: 'Doppio Punteggio' },
  { id: 'pu_slow', name: 'Slow Motion' },
  { id: 'pu_chain', name: 'Combo' },
  { id: 'pu_shield', name: 'Scudo' },
  { id: 'pu_flash', name: 'Flash' },
];

export default function CustomizeScreen() {
  const bgColor = useAnimatedBackground(['#f3e5f5', '#ce93d8']);
  const [selectedSkin, setSelectedSkin] = useState(SKINS[0].id);
  const [selectedHammer, setSelectedHammer] = useState(HAMMERS[0].id);
  const [selectedLandscape, setSelectedLandscape] = useState(LANDSCAPES[0].id);
  const [ownedPowerups, setOwnedPowerups] = useState(POWERUPS.map(p => p.id));
  const [subscribed, setSubscribed] = useState(false);

  // Load persisted settings
  useEffect(() => {
    AsyncStorage.multiGet(['skin','hammer','landscape','subscribed']).then(entries => {
      const settings = Object.fromEntries(entries);
      if (settings.skin) setSelectedSkin(settings.skin);
      if (settings.hammer) setSelectedHammer(settings.hammer);
      if (settings.landscape) setSelectedLandscape(settings.landscape);
      if (settings.subscribed === 'true') setSubscribed(true);
    });
  }, []);

  // Persist selection
  const persist = (key, value) => AsyncStorage.setItem(key, value);

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>      
      <SafeAreaView style={styles.safe}>
        <ScrollView>
          <Text style={styles.section}>Skin Talpa</Text>
          <View style={styles.row}>
            {SKINS.map(skin => (
              <TouchableOpacity
                key={skin.id}
                style={[styles.card, selectedSkin === skin.id && styles.cardActive]}
                onPress={() => { setSelectedSkin(skin.id); persist('skin', skin.id); }}
              >
                <Image source={skin.icon} style={styles.icon} />
                <Text style={styles.label}>{skin.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.section}>Skin Martello</Text>
          <View style={styles.row}>
            {HAMMERS.map(h => (
              <TouchableOpacity
                key={h.id}
                style={[styles.card, selectedHammer === h.id && styles.cardActive]}
                onPress={() => { setSelectedHammer(h.id); persist('hammer', h.id); }}
              >
                <Image source={h.icon} style={styles.icon} />
                <Text style={styles.label}>{h.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.section}>Paesaggi</Text>
          <View style={styles.landRow}>
            {LANDSCAPES.map(l => (
              <TouchableOpacity
                key={l.id}
                style={[styles.landCard, selectedLandscape === l.id && styles.cardActive]}
                onPress={() => { setSelectedLandscape(l.id); persist('landscape', l.id); }}
              >
                <Image source={l.image} style={styles.landImg} />
                <Text style={styles.label}>{l.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.section}>Potenziamenti</Text>
          <View style={styles.row}>
            {POWERUPS.map(pu => (
              <View key={pu.id} style={[styles.card, !ownedPowerups.includes(pu.id) && styles.cardDisabled] }>
                <Text style={styles.label}>{pu.name}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.section}>Abbonamento</Text>
          <View style={styles.subscription}>
            <Text style={styles.subText}>{subscribed ? 'Abbonamento Attivo' : 'Rimuovi Pubblicità'}</Text>
            <TouchableOpacity
              style={[styles.subButton, subscribed && styles.subButtonActive]}
              onPress={() => { setSubscribed(!subscribed); persist('subscribed', String(!subscribed)); }}
            >
              <Text style={styles.subBtnText}>{subscribed ? 'Attivo' : 'Attiva'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  section: { fontSize: 20, fontWeight: '700', margin: 16, color: '#333' },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  card: { width: '45%', backgroundColor: '#fff', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12, elevation: 2 },
  cardActive: { borderWidth: 2, borderColor: '#04d361' },
  cardDisabled: { opacity: 0.4 },
  icon: { width: 64, height: 64, marginBottom: 8, resizeMode: 'contain' },
  label: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  landRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  landCard: { width: '45%', backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, elevation: 2 },
  landImg: { width: '100%', height: 100, borderRadius: 8 },
  subscription: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16, padding: 12, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  subText: { fontSize: 16, fontWeight: '600' },
  subButton: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#04d361', borderRadius: 6 },
  subButtonActive: { backgroundColor: '#888' },
  subBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});

