// src/screens/SocialScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';

export default function SocialScreen({ navigation }) {
  const actions = [
    { key:'shareScore', label:'Condividi Best Score' },
    { key:'tradeSkin', label:'Scambia Skin' },
    { key:'friends', label:'Amici' },
    { key:'invite', label:'Invita un amico' },
    { key:'rate', label:'Valuta l App' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Social</Text>
      <FlatList data={actions} renderItem={renderItem} contentContainerStyle={styles.list} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#fafafa'},
  header:{fontSize:24, fontWeight:'700', margin:16},
  list:{paddingHorizontal:16},
  button:{backgroundColor:'#04d361', padding:12, borderRadius:8, marginBottom:12},
  buttonText:{color:'#fff', fontSize:16, textAlign:'center'}
});