// src/screens/ShopScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAnimatedBackground from '../hook/useAnimatedBackground';
import { db, auth } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// Catalogo prodotti
const COIN_PACKS = [
  { id: 'coins_100', name: '100 Coins', price: 0.99, amount: 100 },
  { id: 'coins_500', name: '500 Coins', price: 3.99, amount: 500 },
  { id: 'coins_1200', name: '1200 Coins', price: 7.99, amount: 1200 },
];
const EXTRA_LIVES = [
  { id: 'life_1', name: '1 Vita', price: 0.99, lives: 1 },
  { id: 'life_5', name: '5 Vite', price: 3.99, lives: 5 },
];
const POWERUPS = [
  { id: 'pu_time', name: 'Tempo Extra', price: 1.99 },
  { id: 'pu_double', name: 'Doppio Punteggio', price: 2.99 },
  { id: 'pu_slow', name: 'Slow Motion', price: 1.49 },
  { id: 'pu_chain', name: 'Combo', price: 2.49 },
  { id: 'pu_shield', name: 'Scudo', price: 1.99 },
  { id: 'pu_flash', name: 'Flash', price: 2.99 },
];
const SKIN_BUNDLES = [
  { id: 'bundle_skins_1', name: 'Pacchetto Skin 1', price: 4.99, skins: ['mole_fire','mole_gold'] },
  { id: 'bundle_skins_2', name: 'Pacchetto Skin 2', price: 5.99, skins: ['mole_ninja'] },
];
const LANDSCAPES = [
  { id: 'land_default', name: 'Prateria', price: 0 },
  { id: 'land_night', name: 'Notturno', price: 2.99 },
  { id: 'land_snow', name: 'Innevato', price: 2.99 },
  { id: 'land_desert', name: 'Deserto', price: 2.99 },
];

export default function ShopScreen() {
  const bgColor = useAnimatedBackground(['#e0f7fa', '#80deea']);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
 

  // Carica stato utente da AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('coins').then(val => setCoins(Number(val) || 0));
    AsyncStorage.getItem('lives').then(val => setLives(Number(val) || 3));
  }, []);

  // Funzione di acquisto
  const handlePurchase = async (product) => {
    let newCoins = coins;
    let newLives = lives;
    if (product.amount) newCoins += product.amount;
    if (product.lives) newLives += product.lives;

    // Simulazione acquisto: qui integreresti il flusso Google Play
    Alert.alert('Acquisto', `Hai acquistato ${product.name}`);

    // Salva localmente
    await AsyncStorage.setItem('coins', String(newCoins));
    await AsyncStorage.setItem('lives', String(newLives));
    setCoins(newCoins);
    setLives(newLives);

    // Registra nel cloud Firestore
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, 'purchases'), {
        uid: user ? user.uid : 'guest',
        productId: product.id,
        date: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Errore salvataggio acquisto cloud', e);
    }
  };

  const renderCard = (item) => (
    <View key={item.id} style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>€{item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handlePurchase(item)} style={styles.btn}>
        <Text style={styles.btnText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bgColor }]} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Shop</Text>
        <Text style={styles.subheader}>Coins: {coins}   Lives: {lives}</Text>

        <Text style={styles.section}>Pacchetti Coin</Text>
        {COIN_PACKS.map(renderCard)}

        <Text style={styles.section}>Vite Extra</Text>
        {EXTRA_LIVES.map(renderCard)}

        <Text style={styles.section}>Potenziamenti</Text>
        {POWERUPS.map(renderCard)}

        <Text style={styles.section}>Skin Bundles</Text>
        {SKIN_BUNDLES.map(renderCard)}

        <Text style={styles.section}>Paesaggi</Text>
        {LANDSCAPES.map(renderCard)}

        <Text style={styles.section}>Abbonamento</Text>
        <TouchableOpacity
          style={styles.subscription}
          onPress={() => handlePurchase({ id:'sub_ads', name:'Rimuovi Pubblicità', price: 4.99 })}
        >
          <Text style={styles.btnText}>Attiva Abbonamento (€4.99)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 4, color: '#006064' },
  subheader: { fontSize: 16, fontWeight: '500', marginBottom: 12, color: '#004d40' },
  section: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8, color: '#004d40' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, elevation: 3, alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '500' },
  price: { fontSize: 14, color: '#555', marginVertical: 4 },
  btn: { backgroundColor: '#006064', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 4 },
  btnText: { color: '#fff', fontWeight: '600' },
  subscription: { backgroundColor: '#ffa000', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 16 },
});
