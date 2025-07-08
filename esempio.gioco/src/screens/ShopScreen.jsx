// src/screens/ShopScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import useAnimatedBackground from '../hook/useAnimatedBackground';

// Mock data
const skins = [
  { id: 'mole_default', name: 'Talpa Default', icon: require('../assets/mole.png'), price: 0 },
  { id: 'mole_fire', name: 'Talpa Fire', icon: require('../assets/mole.png'), price: 200 },
  { id: 'hammer_default', name: 'Martello Base', icon: require('../assets/hammer.png'), price: 0 },
  { id: 'hammer_steel', name: 'Martello Acciaio', icon: require('../assets/hammer.png'), price: 150 },
];
const landscapes = [
  { id: 'land_default', name: 'Prateria', image: require('../assets/land_default.png'), price: 0 },
  { id: 'land_night', name: 'Notturno', image: require('../assets/land_night.png'), price: 300 },
];
const powerups = [
  { id: 'pu_time', name: 'Tempo Extra', price: 100 },
  { id: 'pu_double', name: 'Doppio Punteggio', price: 250 },
];

export default function ShopScreen({ navigation }) {
  const bgColor = useAnimatedBackground(['#e0f7fa', '#80deea']);
  const [coins, setCoins] = useState(500);

  const purchase = (item) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      // TODO: add item to user inventory
    } else {
      // insufficient coins
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bgColor }]} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Shop - Coins: {coins}</Text>
        <Text style={styles.section}>Skins</Text>
        <View style={styles.grid}>
          {skins.map(skin => (
            <View key={skin.id} style={styles.card}>
              <Image source={skin.icon} style={styles.icon} />
              <Text style={styles.name}>{skin.name}</Text>
              <Text style={styles.price}>{skin.price} coins</Text>
              <TouchableOpacity onPress={() => purchase(skin)} style={styles.btn}>
                <Text style={styles.btnText}>Buy</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text style={styles.section}>Paesaggi</Text>
        {landscapes.map(land => (
          <View key={land.id} style={styles.landCard}>
            <Image source={land.image} style={styles.landImage} />
            <Text style={styles.name}>{land.name}</Text>
            <Text style={styles.price}>{land.price} coins</Text>
            <TouchableOpacity onPress={() => purchase(land)} style={styles.btn}>
              <Text style={styles.btnText}>Buy</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={styles.section}>Potenziamenti</Text>
        {powerups.map(pu => (
          <View key={pu.id} style={styles.upCard}>
            <Text style={styles.name}>{pu.name}</Text>
            <Text style={styles.price}>{pu.price} coins</Text>
            <TouchableOpacity onPress={() => purchase(pu)} style={styles.btn}>
              <Text style={styles.btnText}>Buy</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 12, color: '#006064' },
  section: { fontSize: 18, fontWeight: '600', marginVertical: 8, color: '#004d40' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#fff', padding: 8, borderRadius: 8, alignItems: 'center', marginBottom: 12, elevation: 3 },
  icon: { width: 64, height: 64, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '500' },
  price: { fontSize: 12, color: '#555', marginVertical: 4 },
  btn: { backgroundColor: '#006064', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  btnText: { color: '#fff' },
  landCard: { backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, overflow: 'hidden', elevation: 3 },
  landImage: { width: '100%', height: 120 },
  upCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 8, borderRadius: 8, marginBottom: 8, elevation: 3 },
});