// src/screens/CustomizeScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';

export default function CustomizeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Personalizza</Text>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Skin possedute */}
        <Text style={styles.sectionTitle}>Le tue Skin</Text>
        <View style={styles.grid}>
          <View style={styles.item}>
            <Image source={require('../assets/mole.png')} style={styles.icon} />
            <Text style={styles.itemText}>Talpa Default</Text>
          </View>
          {/* TODO: skin acquistate */}
        </View>
        {/* Potenziamenti posseduti */}
        <Text style={styles.sectionTitle}>Potenziamenti</Text>
        <View style={styles.grid}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Tempo Extra x2</Text>
          </View>
          {/* TODO: upgrades */}
        </View>
        {/* Abbonamento */}
        <Text style={styles.sectionTitle}>Abbonamento</Text>
        <View style={styles.subscription}>
          <Text style={styles.itemText}>Rimuovi Pubblicità</Text>
          {/* TODO: stato abbonamento e pulsante acquisto */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#fafafa'},
  header:{fontSize:24,fontWeight:'700',margin:16},
  content:{paddingHorizontal:16},
  sectionTitle:{fontSize:18,fontWeight:'600',marginVertical:12},
  grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},
  item:{width:'48%',backgroundColor:'#fff',padding:12,marginBottom:12,borderRadius:8,alignItems:'center',elevation:2},
  icon:{width:64,height:64,marginBottom:8},
  itemText:{fontSize:14,fontWeight:'500'},
  subscription:{backgroundColor:'#ffa502',padding:12,borderRadius:8,alignItems:'center',marginVertical:12}
});