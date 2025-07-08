// src/screens/CustomizeScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import useAnimatedBackground from '../hook/useAnimatedBackground';

// Mock owned items
const ownedSkins = [
  { id:'mole_default', name:'Talpa Default', icon: require('../assets/mole.png') },
];
const ownedPowerups = [
  { id:'pu_time', name:'Tempo Extra x2' },
];
const subscription = { active: false };

export default function CustomizeScreen() {
  const bgColor = useAnimatedBackground(['#f3e5f5', '#ce93d8']);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bgColor }]} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Personalizza</Text>
        <Text style={styles.section}>Le tue Skin</Text>
        <View style={styles.grid}>
          {ownedSkins.map(skin => (
            <View key={skin.id} style={styles.card}>
              <Image source={skin.icon} style={styles.icon} />
              <Text style={styles.name}>{skin.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.section}>Potenziamenti</Text>
        {ownedPowerups.map(pu => (
          <View key={pu.id} style={styles.upCard}>
            <Text style={styles.name}>{pu.name}</Text>
          </View>
        ))}
        <Text style={styles.section}>Abbonamento</Text>
        <TouchableOpacity style={[styles.subCard, subscription.active ? styles.subActive : {}]}>           
          <Text style={styles.name}>{subscription.active ? 'Attivo' : 'Rimuovi Pubblicità'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1 },
  content: { padding:16 },
  header: { fontSize:24, fontWeight:'700', marginBottom:16, color:'#4a148c' },
  section: { fontSize:18, fontWeight:'600', marginVertical:12, color:'#6a1b9a' },
  grid: { flexDirection:'row', flexWrap:'wrap', justifyContent:'flex-start' },
  card: { width:'30%', backgroundColor:'#fff', padding:8, borderRadius:8, alignItems:'center', margin:4, elevation:2 },
  icon: { width:48, height:48, marginBottom:4 },
  name: { fontSize:12, fontWeight:'500' },
  upCard: { backgroundColor:'#fff', padding:8, borderRadius:8, marginBottom:8, elevation:2 },
  subCard: { backgroundColor:'#fff', padding:12, borderRadius:8, alignItems:'center', marginVertical:12, elevation:2 },
  subActive: { backgroundColor:'#ce93d8' },
});
