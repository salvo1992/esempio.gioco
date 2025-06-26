import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function EndScreen({ route, navigation }) {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <Text style={styles.score}>Your Score: {score}</Text>
      <Button title="Play Again" onPress={() => navigation.replace('Game')} />
      <Button title="Back to Home" onPress={() => navigation.replace('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { fontSize:30, fontWeight:'bold', marginBottom:20 },
  score: { fontSize:20, marginBottom:20 },
});

