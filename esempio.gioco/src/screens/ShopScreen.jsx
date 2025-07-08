// src/screens/ShopScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function ShopScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Shop</Text>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Skin Selections */}
        <Text style={styles.sectionTitle}>Skins</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.item}>
            <Image source={require('../assets/mole.png')} style={styles.icon} />
            <Text style={styles.itemText}>Talpa Default</Text>
            <Text style={styles.price}>100 coins</Text>
          </TouchableOpacity>
          {/* TODO: altri items */}
        </View>
        {/* Potenziamenti */}
        <Text style={styles.sectionTitle}>Potenziamenti</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Tempo Extra</Text>
            <Text style={styles.price}>50 coins</Text>
          </TouchableOpacity>
          {/* TODO: altri upgrades */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fafafa' },
  header: { fontSize:24, fontWeight:'700', margin:16 },
  content: { paddingHorizontal:16 },
  sectionTitle: { fontSize:18, fontWeight:'600', marginVertical:12 },
  grid: { flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between' },
  item: { width:'48%', backgroundColor:'#fff', padding:12, marginBottom:12, borderRadius:8, alignItems:'center', elevation:2 },
  icon: { width:64, height:64, marginBottom:8 },
  itemText: { fontSize:14, fontWeight:'500' },
  price: { fontSize:12, color:'#888', marginTop:4 }
});